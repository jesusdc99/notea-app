import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  public url: string = 'https://api.openweathermap.org/data/2.5/weather';
  public apiKey: string = environment.weatherConfig.apiKey;

  constructor(private http: HttpClient) { }

  getWeather(id: string): Observable<Object> {
    return this.http.get(this.url+'?id='+id+'&appid='+this.apiKey+'&units=metric')
      .pipe(
        map(res => res || [])
      );
  }
}
