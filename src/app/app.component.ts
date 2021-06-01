import { Component } from '@angular/core';
import { globalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tema: boolean = globalConstants.temaOscuro;
  title = 'legajosApp';
  constructor(){
    localStorage.removeItem('validado');
  }
}
