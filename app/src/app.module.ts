import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { WeatherComponent } from './components/weather/weather.component';

import {GoogleMapLoaderService} from './components/common/google_maps_loader.service';
import {LocationService} from './components/common/location.service';
import {MarkersService} from './components/common/markers.service';
import {RestService} from './components/common/rest.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, GooglemapComponent, WeatherComponent ],
  providers: [RestService, MarkersService, LocationService, GoogleMapLoaderService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
