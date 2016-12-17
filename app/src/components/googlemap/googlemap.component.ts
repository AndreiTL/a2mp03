import { Component, Input } from '@angular/core';
import {template} from './googlemap.tpl';

import {LocationService} from '../common/location.service';

import {GoogleMapLoaderService} from '../common/google_maps_loader.service';

@Component({
  selector: 'googlemap',
  template: template
})
export class GooglemapComponent {
  @Input() options: NGoogleMapService.IGoogleMapOptions ;

  lat: string = '0.0';
  lng: string = '0.0';
  zoom: string = '1';

  key: string = 'AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA';

  googleMapObj: google.maps.Map;

  markerArray: NGoogleMapService.IMarkerPoint[];

  constructor(){
    console.log("GooglemapComponent");
    this.initMap();
    LocationService.getCurrentLocation().then(
      (coordinate: Coordinates) => {
        this.setMapCenterAndZoom(coordinate.latitude, coordinate.longitude, 8);
      }
    )
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
    GoogleMapLoaderService.load({key: this.key}).then((googleMaps: any) => {
      this.googleMapObj = new googleMaps.Map(document.getElementById('googlemap'), {
        center: {lat: parseFloat(this.lat), lng: parseFloat(this.lng)},
        zoom: parseInt(this.zoom)
      });

    }).catch((err: Object) => {
      console.error(err);
      alert('Cann\'t load google map!');
    });
  }


}