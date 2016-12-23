import {Component, Input } from '@angular/core';
import {template} from './googlemap.tpl';

// import {LocationService} from '../common/location.service';

import {GoogleMapLoaderService} from '../common/google_maps_loader.service';
//import {DetectChangesVars} from "@angular/compiler/src/view_compiler/constants";

@Component({
  selector: 'googlemap',
  template: template,
  providers: [ /*LocationService,*/ GoogleMapLoaderService]
})
export class GooglemapComponent {
  // @Input() options: NGoogleMapService.IGoogleMapOptions ;
  // @Input() coordinates: Coordinates;
  @Input() location: ILocation.ICoordinates;
  @Input() zoom: number = 1;
  // @Output() update: Function;

  // lat: string = '0.0';
  // lng: string = '0.0';
  // zoom: string = '1';

  key: string = 'AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA';

  googleMapObj: google.maps.Map;

  // location: ILocation.ICoordinates;

  markerArray: NGoogleMapService.IMarkerPoint[];

  constructor( // private locationService: LocationService,
              // private cd: DetectChangesVars,
              private googleMapLoaderService: GoogleMapLoaderService){
    console.log("GooglemapComponent");

    this.location = {
      latitude: 10,
      longitude: 10
    };

    this.initMap();
    // locationService.getCurrentLocation().then(
    //   (coordinate: Coordinates) => {
    //     this.setMapCenterAndZoom(coordinate.latitude, coordinate.longitude, 8);
    //   }
    // )
  }

  setMapCenterAndZoom(lat: number, lng: number, zoom: number){
    let mapOptions: google.maps.MapOptions = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: zoom
    };
    this.googleMapObj.setOptions(mapOptions);
  }

  setMarkers(markerSetArray: NGoogleMapService.IMarkerPoint[]){
    this.markerArray = markerSetArray;
    markerSetArray.forEach((value: NGoogleMapService.IMarkerPoint, index: number, array: NGoogleMapService.IMarkerPoint[]) => {
      new google.maps.Marker({
        position: {lat: value.lat, lng: value.lng},
        map: this.googleMapObj,
        title: value.text
      });
    })
  }

  initMap() {
    this.googleMapLoaderService.load({key: this.key}).then((googleMaps: any) => {
      this.googleMapObj = new googleMaps.Map(document.getElementById('googlemap'), {
        center: {lat: this.location.latitude, lng: this.location.longitude},
        zoom: this.zoom
      });

    }).catch((err: Object) => {
      console.error(err);
      alert('Cann\'t load google map!');
    });
  }


}