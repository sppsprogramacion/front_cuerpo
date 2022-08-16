import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { globalConstants } from 'src/app/common/global-constants';
import { AscensoModel } from 'src/app/models/ascenso.model';
import { AscensoService } from 'src/app/services/ascenso.service';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  administrador: boolean = false;
  
  //FORMULARIOS  
  formaGrado: FormGroup;

  //variables de manejo de grado
  dataGrado: AscensoModel= new AscensoModel;  
  tituloFormGrado:string = "";
  newGradoDialog: boolean= false;
  submitedGradoo:boolean=false;
  guardarGrado: boolean = false;
  gradoConfigurado: boolean = false;  
  listaTGrado: any[]=[];
  totalRecords: number = 0;

  //DATEPICKER
  bsDatePickerConfig!: Partial<BsDatepickerConfig>;
  
  constructor(    
    private readonly ascensoService: AscensoService,
    private readonly personalService: PersonalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private readonly datePipe: DatePipe,
  ) {
    //analizar si es administrador o no
    this.administrador = (globalConstants.rol_usuario == "0")? true: false;

    //FORMULARIO ASCENSO    
    this.formaGrado = this.fb.group({
      dni_personal: [0,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      legajo: [0,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
      escalafon_id: [3,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      escala_jerarquica_id: [3,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      grado_id: [18,[Validators.required, Validators.pattern(/^[0-9]*$/)]],      
      fecha_ascenso: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      // vigente: [true, [Validators.required]],
      orden: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      // anio_orden: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],      
      // instrumento_orden: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fecha_instrumento_orden: [,[Validators.required]]
    });
    //FIN FORMULARIO ASCENSO........................................................................................................

   }

  ngOnInit(): void {
  }

  //LISTADO DE TRASLADOS
  listarGrados(){
    
    // this.ascensoService.getNuevosXDestino().
    //   subscribe(respuesta => {
    //     this.totalRecords = respuesta[1];
    //     this.listaTraslado = respuesta[0];
    //     this.formaCantTraslados.get('cantidad_traslados')?.setValue(this.totalRecords);
    //     this.cargando = false;

    
    //   });
  }
  //FIN LISTADO DE TRASLADOS
}
