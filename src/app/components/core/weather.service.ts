import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface IWeather {
  region: string;
  temperatureByDate: Array<number>;
  color: {
    red: number,
    green: number,
    blue: number,
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  serverApiUrl = `${environment.apiUrl}assets/weather.json`;

  constructor(private httpClient: HttpClient) {
  }

  getDataFromWeatherServer(): Observable<Array<IWeather>> {
    return this.httpClient.get<Array<IWeather>>(this.serverApiUrl).pipe(
      map((res: Array<IWeather>) => {
          return res;
        }
      ),
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

}
