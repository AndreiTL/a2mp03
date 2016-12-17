import {Component, Input, NgZone} from '@angular/core';
import {template} from './weather.tpl';

import {RestService} from '../common/rest.service';
import {LocationService} from '../common/location.service'

@Component({
  selector: 'weather',
  template: template
})
export class WeatherComponent {
  @Input() amounttowns: string;
  // @Output() updateMarkers: Function;

  API: string = `94c7919f6854ca11558382472a998f8f`;
  // cnt: string = '10';

  // url: string = `http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=${this.API}`; // Minsk id
  typeRequest: string = 'GET';
  async: boolean = true;
  weatherObject: Weather.IWeatherResponse;

  trigLoad: boolean = false;
  townsTable: Weather.ITownWeather[] ;

  constructor(
      private zone: NgZone
    ){

    console.log("WeatherComponent");
    this.townsTable = [];
    LocationService.getCurrentLocation().then(
      (coordinate: Coordinates) => {
        this.downloadWeatherInCircle(coordinate.latitude, coordinate.longitude, parseInt(this.amounttowns));
      }
    )
  }

  private updateTableList(responseText: string){
    if (responseText !== null){
      this.weatherObject = <Weather.IWeatherResponse> JSON.parse(responseText);
      this.townsTable = this.weatherObject.list;
      console.log(this);
      this.trigLoad = true;
      this.zone.run(() => {});
    } else {
      console.log('Cann\'t update table list!  Input parameter is empty!');
      alert('Cann\'t update table list! Input parameter is empty!');
    }
  }

  downloadWeatherInCircle(latitude: number, longitude: number, count: number){
    let urlTemplate: string = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${count}&appid=${this.API}`;
    RestService.sendRequest(this.typeRequest, urlTemplate, this.async, '').then(
      (responseText: string) => {
        this.updateTableList(responseText);
      },
        () => {
          console.log('Cann\'t load data from weather portal!');
          alert('Cann\'t load data from weather portal!');
        }
    );
  }

  // getWeatherObject(){
  //   return this.weatherObject;
  // }

}