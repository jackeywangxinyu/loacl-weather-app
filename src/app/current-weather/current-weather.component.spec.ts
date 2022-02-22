import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { injectSpy } from 'angular-unit-test-helper'
import { of } from 'rxjs'

import { ICurrentWeather } from './../interfaces'
import { MaterialModule } from './../material.module'
import { WeatherService } from '../weather/weather.service'
import { CurrentWeatherComponent } from './current-weather.component'

export const fakeWeather: ICurrentWeather = {
  city: 'New York',
  country: 'US',
  date: 1568801600,
  image: '',
  temperature: 57,
  description: 'light intensity drizzle',
}

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>
  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ])

    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CurrentWeatherComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    }).compileComponents()
    weatherServiceMock = injectSpy(WeatherService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
    // fixture.detectChanges()
  })

  it('should create', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should get currentWeather from weatherService', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    fixture.detectChanges()
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1)
  })

  it('should eagerly load currentWeather in NewYork from weatherService', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather))
    fixture.detectChanges()
    // expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1)
    expect(component.current.city).toEqual(fakeWeather.city)
    expect(component.current.country).toEqual(fakeWeather.country)
    expect(component.current.date).toEqual(fakeWeather.date)
    expect(component.current.description).toEqual(fakeWeather.description)
    expect(component.current.temperature).toEqual(fakeWeather.temperature)

    const el = fixture.debugElement
    const title: HTMLElement = el.query(By.css('.mat-title')).nativeElement
    expect(title.textContent).toContain(fakeWeather.city)
  })
})
