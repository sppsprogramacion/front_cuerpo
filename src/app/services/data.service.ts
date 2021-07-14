import { Injectable } from '@angular/core';
import { Personal } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  personalData: Personal = {};
  constructor() { }

  getPersonalData(data: Personal){
    this.personalData = data;
  }
}
