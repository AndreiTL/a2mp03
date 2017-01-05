import {Component} from '@angular/core';
import {template} from './header.tpl';
import {WeatherModelService} from '../weather/weather_model.service';

@Component({
  selector: 'my-header',
  template: template,
  providers: [ ]
})
export class HeaderComponent {

  lastUpddateTime: number;

  constructor(
    private weatherModelService: WeatherModelService
  ) {
    this.lastUpddateTime = weatherModelService.getLastUpdateTime();
  }

  updateView(): void {

  }

}
