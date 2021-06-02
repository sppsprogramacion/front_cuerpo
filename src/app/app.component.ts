import { Component, OnInit } from '@angular/core';
import { globalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tema: boolean = globalConstants.temaOscuro;
  title = 'legajosApp';

  constructor(){}

  ngOnInit(): void {
    this.tema = globalConstants.temaOscuro;
  }

}

