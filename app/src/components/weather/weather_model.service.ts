import {Injectable} from '@angular/core';
import {StorageService} from '../common/storage.service';
import {RestService} from '../common/rest.service';


@Injectable()
export class WeatherModelService {

  maxTimeValide: number = 30 * 60 * 1000;

  API: string = `94c7919f6854ca11558382472a998f8f`;

  typeRequest: string = 'GET';
  async: boolean = true;

  latitude: number = 30;
  longitude: number = 30;
  count: number = 1;

  constructor(private storageService: StorageService,
          private restService: RestService
  ) {

  }

  setWeatherParams(options: Weather.IWeatherParams) {
    this.longitude = options.lng;
    this.latitude = options.lat;
    this.count = options.cnt;
  }

  getWeatherInCircle(): Promise<Weather.IWeatherObject> {
    return new Promise((resolve, reject): void => {
      let weather: Weather.IWeather;

      let lastUpdateTimeString: string = this.storageService.getData('lastUpdateTime');
      let lastUpdateTime: number; // = Date.parse(lastUpdateTimeString);

      // if !lastUpdateTime  and  > 1 hour -> load new data from server

      // if (!lastUpdateTime &&)
      //
      // let locationString: string = this.storageService.getData('location');

      if (!lastUpdateTimeString) {
        // weather = this.loadWeather();
        console.log('Nothing in storage. Load from internet.');
        this.loadWeather().then((weatherObj: Weather.IWeather) => {
          lastUpdateTime = Date.now();
          this.storageService.setData('lastUpdateTime', JSON.stringify(lastUpdateTime));
          this.storageService.setData('weather', JSON.stringify(weatherObj));
          resolve(weatherObj);
        },
        () => {
          reject();
        });
      } else {
        lastUpdateTime = Date.parse(lastUpdateTimeString);
        if (lastUpdateTime < (Date.now() - this.maxTimeValide) ) {
          // weather = this.loadWeather();
          console.log('Expired in storage. Load from internet.');
          this.loadWeather().then((weatherObj: Weather.IWeather) => {
            lastUpdateTime = Date.now();
            this.storageService.setData('lastUpdateTime', JSON.stringify(lastUpdateTime));
            this.storageService.setData('weather', JSON.stringify(weatherObj));
            resolve(weatherObj);
          },
          () => {
            reject();
          });
        } else {
          console.log('Valid in storage. Load from storage.');
          let weatherString = this.storageService.getData('weather');
          weather = <Weather.IWeather> JSON.parse(weatherString);
          resolve(weather);
        }

      }

    });
  }

  loadWeather(): Promise<Weather.IWeather> {
    return new Promise((resolve, reject): void => {
      let weather: Weather.IWeather;

      let urlTemplate = `http://api.openweathermap.org/data/2.5/find?lat=` +
        `${this.latitude}&lon=${this.longitude}&cnt=${this.count}&appid=${this.API}`;

      this.restService.sendRequest(this.typeRequest, urlTemplate, this.async, '').then(
        (responseText: string) => {
          // this.updateTableList(responseText);
          console.log(responseText);
          weather = <Weather.IWeather> JSON.parse(responseText);
          resolve(weather);
        },
        () => {
          console.log('Cann\'t load data from weather portal!');
          alert('Cann\'t load data from weather portal!');
          reject();
        }
      );

      // // promise exit
      // console.log('Unknown and unreachable bug');
      // alert('Unknown and unreachable bug');
      // reject();
    });

  }
}
