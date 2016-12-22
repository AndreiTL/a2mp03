import { Component } from '@angular/core';

import { template } from './app.tpl';
import {LocationService} from "./components/common/location.service";
import IGoogleMapOptions = NGoogleMapService.IGoogleMapOptions;

@Component({
  selector: 'my-app',
  template: template
})
export class AppComponent  {

  googleMapOptions: IGoogleMapOptions;
  // Here you define how many town will be shown.
  amountTowns: string = '5';

  getLocation: Promise<IGoogleMapOptions>;
  
  constructor(private locationService: LocationService){
    this.googleMapOptions = {
      lat: 0,
      lng: 0,
      zoom: 8
    };
    // this.getLocation = this.locationService.getCurrentLocation;
    this.getLocation = new Promise<IGoogleMapOptions>(
      (resolve, reject) => {
        // this.resolve = resolve;
        this.locationService.getCurrentLocation().then(
          (coordinate: Coordinates) => {
            let opt: IGoogleMapOptions = {
              lat: coordinate.latitude,
              lng: coordinate.longitude,
              zoom: 8
            };
            // opt;
            resolve(opt);
          },
          () => {
            let opt: IGoogleMapOptions = {
              lat: 10,
              lng: 10,
              zoom: 8
            };
            resolve(opt);
          }
        )
      });
  }

  // getLocation() {
  //   return this.locationService.getCurrentLocation().then(
  //     (coordinate: Coordinates) => {
  //       let opt: IGoogleMapOptions = {
  //         lat: coordinate.latitude,
  //         lng: coordinate.longitude,
  //         zoom: 8
  //       };
  //       // this.googleMapOptions.lat = coordinate.latitude;
  //       // this.googleMapOptions.lat = coordinate.longitude;
  //       // console.dir(opt);
  //       return opt;
  //     }
  //   )
  // }

}
