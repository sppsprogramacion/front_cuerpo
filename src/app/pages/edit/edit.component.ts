import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import {TabViewModule} from 'primeng/tabview';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    // './edit.component.css'
  ]
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
       apellido_2: [this.dataEdit.apellido_2],
       nombre_1: [this.dataEdit.nombre_1,Validators.required],
       nombre_2: [this.dataEdit.nombre_2],
       nombre_3: [this.dataEdit.nombre_3],
       dni: [this.dataEdit.dni,[Validators.required,Validators.min(1111111),Validators.max(99999999)]]
  });
    this.submitForm();
   }

  ngOnInit(): void {
    
  }

  get apellido1NoValido(){
    return this.forma.get('apellido_1')?.invalid && this.forma.get('apellido_1')?.touched;
  }

  get nombre1NoValido(){
    return this.forma.get('nombre_1')?.invalid && this.forma.get('nombre_1')?.touched;
  }

  get dniNoValido(){
    return this.forma.get('dni')?.invalid && this.forma.get('dni')?.touched;
  }

  

  submitForm(){
    console.log('DATOS EN FORMA:', this.forma);
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => control.markAsTouched());
    }
  }

  

    


}
