import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import {TabViewModule} from 'primeng/tabview';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  // styleUrls: [
  //   './edit.component.scss'
  // ]
})
export class EditComponent implements OnInit {
  forma: FormGroup;
  dataEdit: Personal={};
  constructor(
    public dataService: DataService,
    private fb: FormBuilder
  ) {
    this.dataEdit= dataService.personalData;
    this.crearFormulario();
   }

  ngOnInit(): void {
    
  }

  crearFormulario(){
    this.forma = this.fb.group({

    });
  }

    


}
