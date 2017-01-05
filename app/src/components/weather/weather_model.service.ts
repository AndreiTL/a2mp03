import {Injectable} from '@angular/core';
import {StorageService} from '../common/storage.service';
import {RestService} from '../common/rest.service';

@Injectable()
export class WeatherModelService {

  // 10 minutes
  maxTimeValide: number = 10 * 60 * 1000;

  API: string = `94c7919f6854ca11558382472a998f8f`;

  typeRequest: string = 'GET';
  async: boolean = true;

  latitude: number = 0;
  longitude: number = 0;
  count: number = 1;

  constructor(private storageService: StorageService,
          private restService: RestService
  ) {

  }

  setWeatherParams(options: Weather.IWeatherParams) {
    this.longitude = options.longitude;
    this.latitude = options.latitude;
    this.count = options.count;
  }

  getWeatherInCircle(): Promise<Weather.IWeatherObject> {
    return new Promise((resolve, reject): void => {
      let weather: Weather.IWeather;
      let lastUpdateTimeString: string = this.storageService.getData('lastUpdateTime');
      let lastUpdateTime: number;
      if (!lastUpdateTimeString) {
        // case: first load
        console.log('Nothing in storage. Load from internet.');
        this.loadWeather().then((weatherObj: Weather.IWeather) => {
          lastUpdateTime = Date.now();
          this.storageService.setData('lastUpdateTime', JSON.stringify(lastUpdateTime));
          this.storageService.setData('weather', JSON.stringify(weatherObj));
          this.storageService.setData('params', JSON.stringify({
            longitude: this.longitude,
            latitude: this.latitude,
            count: this.count})
          );

          resolve(weatherObj);
        },
        () => {
          reject();
        });
      } else {
        // in milliseconds
        lastUpdateTime = parseInt(lastUpdateTimeString, 10);
        let paramsString: string = this.storageService.getData('params');
        let params: Weather.IWeatherParams = <Weather.IWeatherParams> JSON.parse(paramsString);
        if ((lastUpdateTime > (Date.now() - this.maxTimeValide)) &&
            params.latitude === this.latitude &&
            params.longitude === this.longitude &&
            params.count === this.count
          ) {
          // case: in storage are valid data then load from storage
          console.log('Valid in storage. Load from storage.');
          let weatherString = this.storageService.getData('weather');
          weather = <Weather.IWeather> JSON.parse(weatherString);
          resolve(weather);
        } else {
          // case: in storage are expired data then load from internet
          console.log('Expired or invalid in storage. Load from internet.');
          this.loadWeather().then((weatherObj: Weather.IWeather) => {
              lastUpdateTime = Date.now();
              this.storageService.setData('lastUpdateTime', JSON.stringify(lastUpdateTime));
              this.storageService.setData('weather', JSON.stringify(weatherObj));
              this.storageService.setData('params', JSON.stringify({
                longitude: this.longitude,
                latitude: this.latitude,
                count: this.count})
              );
              resolve(weatherObj);
            },
            () => {
              reject();
            });
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
          weather = <Weather.IWeather> JSON.parse(responseText);
          resolve(weather);
        },
        () => {
          console.log('Cann\'t load data from weather portal!');
          alert('Cann\'t load data from weather portal!');
          reject();
        }
      );
    });
  }
}
