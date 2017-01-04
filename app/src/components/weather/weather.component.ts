import {Component, Input, NgZone} from '@angular/core';
import {template} from './weather.tpl';

// import {RestService} from '../common/rest.service';
import {WeatherModelService} from './weather_model.service';

@Component({
  selector: 'weather',
  template: template
  // providers: [RestService]
})
export class WeatherComponent {
  @Input() location: ILocation.ICoordinates;
  @Input() amounttowns: string;

  // API: string = `94c7919f6854ca11558382472a998f8f`;
  // cnt: string = '10';

  // url: string = `http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=${this.API}`; // Minsk id
  // typeRequest: string = 'GET';
  // async: boolean = true;
  weatherObject: Weather.IWeatherObject;

  trigLoad: boolean = false;
  townsTable: Weather.ITownWeather[] ;

  constructor(
      private zone: NgZone,
      // private restService: RestService,
      private weatherModelService: WeatherModelService
    ) {

    console.log('WeatherComponent');
    this.townsTable = [];

  }

  ngAfterContentInit() {
    this.weatherModelService.setWeatherParams({
      lat: this.location.latitude,
      lng: this.location.longitude,
      cnt: parseInt(this.amounttowns, 10)
    });
    // this.downloadWeatherInCircle(this.location.latitude, this.location.longitude, parseInt(this.amounttowns, 10));
    this.weatherModelService.getWeatherInCircle().then(
      (weatherObj: Weather.IWeatherObject) => {
        console.dir(weatherObj);
        this.weatherObject = weatherObj;
        this.townsTable = this.weatherObject.list;
        // this.updateTableList();
      },
      () => {
        console.log('Cann\'t update table list!  Input parameter is empty!');
        alert('Cann\'t update table list! Input parameter is empty!');
      }
    ).then( () => {
      this.updateTableList();
    });
  }

  private updateTableList() {
    this.trigLoad = true;
    this.zone.run(() => {});
  }

  // private updateTableList(responseText: string) {
  //   if (responseText !== null) {
  //     this.weatherObject = <Weather.IWeatherObject> JSON.parse(responseText);
  //     this.townsTable = this.weatherObject.list;
  //     console.log(this);
  //     this.trigLoad = true;
  //     this.zone.run(() => {});
  //   } else {
  //     console.log('Cann\'t update table list!  Input parameter is empty!');
  //     alert('Cann\'t update table list! Input parameter is empty!');
  //   }
  // }

  // downloadWeatherInCircle(latitude: number, longitude: number, count: number) {
  //   let urlTemplate = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${count}&appid=${this.API}`;
  //   this.restService.sendRequest(this.typeRequest, urlTemplate, this.async, '').then(
  //     (responseText: string) => {
  //       this.updateTableList(responseText);
  //     },
  //       () => {
  //         console.log('Cann\'t load data from weather portal!');
  //         alert('Cann\'t load data from weather portal!');
  //       }
  //   );
  // }
}
