import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import {TabViewModule} from 'primeng/tabview';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './edit.component.scss'
  ]
})
export class EditComponent implements OnInit {
  dataEdit: Personal={};
  constructor(
    public dataService: DataService
  ) {
    this.dataEdit= dataService.personalData;
   }

  ngOnInit(): void {
    
  }




}
