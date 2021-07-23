import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import {TabViewModule} from 'primeng/tabview';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinoModel } from '../../models/destino.model';
import { destinos, departamentos } from 'src/app/common/data-mockeada';
import { globalConstants } from '../../common/global-constants';
import { DepartamentoModel } from '../../models/departamento.model';


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
  nombreCompleto: string="";
  destinos: DestinoModel[]=[];
  administrador: boolean = false;
  destino_txt: string="";
  departamentos: DepartamentoModel[]=[];
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
       dni: [this.dataEdit.dni,[Validators.required,Validators.min(1111111),Validators.max(99999999)]],
       legajo: [this.dataEdit.legajo,[Validators.required]],
       destino_id: [this.dataEdit.destino_id,[Validators.required]],
       departamento_id: [this.dataEdit.departamento_id],
  });
    this.submitForm();
   
    let auxiliar: any;
    auxiliar = this.dataEdit.grado;
    this.nombreCompleto = (auxiliar.grado! || "") + " " + (this.dataEdit.apellido_1! || "") + " " + (this.dataEdit.apellido_2! || "") +" " + (this.dataEdit.nombre_1! || "") +" " + (this.dataEdit.nombre_2! || "") +" " + (this.dataEdit.nombre_3! || "");
    this.nombreCompleto = this.nombreCompleto.toUpperCase();
    this.administrador = (globalConstants.rol_usuario == "0")? true: false;
    auxiliar = this.dataEdit.destino;
    this.destino_txt = auxiliar.destino;
    //this.departamentos = departamentos;
    this.cargarDepartamentos(this.dataEdit.destino_id!);
    console.log('DEPARTAMENTOS CARGADOS', this.departamentos);

   }

  ngOnInit(): void {
    //cargar el array de destinos
    this.destinos = destinos;
    
    
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

  get legajoNoValido(){
    return this.forma.get('legajo')?.invalid && this.forma.get('legajo')?.touched;
  }

  get destinoNoValido(){
    return this.forma.get('destino_id')?.invalid && this.forma.get('destino_1')?.touched;
  }

  get departamentoNoValido(){
    return this.forma.get('departamento_id')?.invalid && this.forma.get('departamento_id')?.touched;
  }

  cargarDepartamentos(destino_id: number){
     this.departamentos=departamentos.filter(departamento => {
       
              return departamento.destino_id == destino_id || departamento.destino_id == 0;
         });
  }
//esta metodo debe ser modificado utilizando acutalizacon de departamentos o eliminarse
  onChengeDestino(){
    const id = this.forma.get('destino_id')?.value;
    console.log('valor de la clave', id);
    if(id != null){
      this.cargarDepartamentos(parseInt(id.toString()));
      console.log('ACUALIZACION DE DEPARTAMENTOS', this.departamentos);
    }

  }

  

  submitForm(){
       if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => control.markAsTouched());
    }
  }

  

    


}
