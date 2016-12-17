import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { WeatherComponent } from './components/weather/weather.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, GooglemapComponent, WeatherComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
