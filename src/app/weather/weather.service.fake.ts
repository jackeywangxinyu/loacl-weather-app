import { Observable, of } from 'rxjs'

import { ICurrentWeather } from './../interfaces'
import { IWeatherService } from './weather.service'

export const fakeWeather: ICurrentWeather = {
  city: 'New York',
  country: 'US',
  date: 1568801600,
  image: '',
  temperature: 57,
  description: 'light intensity drizzle',
}

export class WeatherServiceFake implements IWeatherService {
  private fakeWeather: ICurrentWeather = fakeWeather

  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(this.fakeWeather)
  }
}
