import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import {TabViewModule} from 'primeng/tabview';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
    //creando el formulario
    this.forma = this.fb.group({
       id_personal: [this.dataEdit.id_personal,Validators.required],
       apellido_1: [this.dataEdit.apellido_1,Validators.required],
       apellido_2: [this.dataEdit.apellido_2,Validators.required],
       nombre_1: [this.dataEdit.nombre_1,Validators.required],
       nombre_2: [this.dataEdit.nombre_2,Validators.required],
       nombre_3: [this.dataEdit.nombre_3,Validators.required],
       dni: [this.dataEdit.dni,Validators.required]
  });
    this.submitForm();
   }

  ngOnInit(): void {
    
  }

  submitForm(){
    console.log('DATOS EN FORMA:', this.forma);
  }

  

    


}
