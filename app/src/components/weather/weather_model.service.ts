import {Injectable} from '@angular/core';
import {StorageService} from '../common/storage.service';
import {RestService} from '../common/rest.service';


@Injectable()
export class WeatherModelService {

  maxTimeValide: number;

  constructor(private storageService: StorageService,
          restService: RestService
  ) {

  }

  getWeatherObject(): Promise<Weather.IWeatherObject> {
    return new Promise((resolve, reject): void => {

      let lastUpdateTime: string = this.storageService.getData('lastUpdateTime');

      // if !lastUpdateTime  and  > 1 hour -> load new data from server

      // if (!lastUpdateTime &&)
      //
      // let locationString: string = this.storageService.getData('location');

    });
  }

}
