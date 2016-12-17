import { Component } from '@angular/core';

import { template } from './app.tpl';

@Component({
  selector: 'my-app',
  template: template
})
export class AppComponent  {

  // Here you define how many town will be shown.
  amountTowns: string = '5';
  
  constructor(){

  }

}
