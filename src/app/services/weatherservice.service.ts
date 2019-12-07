import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  public apiKey2: string = '&appid=70dcc262c44ebb77af9b3125b25de986';
  public example2: string = 'api.openweathermap.org/data/2.5/weather?q=Cordoba&appid=70dcc262c44ebb77af9b3125b25de986';
  //
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
