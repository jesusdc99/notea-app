import { WeatherserviceService } from './../services/weatherservice.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public locations: any[] = [
    {
      id: 2519240,
      name: 'Córdoba'
    },
    {
      id: 2517740,
      name: 'Fernán-Núñez'
    },
    {
      id: 2513601,
      name: 'Montilla'
    },
    {
      id: 2515597,
      name: 'La Rambla'
    },
    {
      id: 2514392,
      name: 'Lucena'
    },
    {
      id: 2520645,
      name: 'Cabra'
    },
    {
      id: 3117735,
      name: 'Madrid'
    },
    {
      id: 3128760,
      name: 'Barcelona'
    },
    {
      id: 3336902,
      name: 'Galicia'
    },
  ];

  public weather: Object;
  private location_id: string;

  constructor(private weatherS: WeatherserviceService) { }

  readWeather(): void {
    this.weatherS.getWeather(this.location_id)
      .subscribe((response) => {
        this.weather = response;
        console.log(this.weather);
      });
  }

  setLocation($event): void {
    console.log('cambio');
    console.log($event.target.value);
    this.location_id = $event.target.value;
    this.readWeather();
  }
}
