import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../services/personal.service';
import { Personal, IPersonalTable } from '../../models/personal.model';
import { globalConstants } from '../../common/global-constants';
import { destinos, escalafon, escalaJerarquica, grados, nivelEducativo, sexos, situacion, departamentos, provincias } from 'src/app/common/data-mockeada';
//import * as path from 'path';
import { DataService } from '../../services/data.service';
import { FotopersonalPipe } from '../../pipes/fotopersonal.pipe';

import * as printJS from 'print-js';
import * as FileSaver from 'file-saver';
import { estados_civil, departamentos_provincial, sectores } from '../../common/data-mockeada';
import { DepartamentoModel } from '../../models/departamento.model';
import { DatePipe } from '@angular/common';


interface IObjectModel{
  label: string; 
  value: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
      './list.component.scss'
  ]
})
export class ListComponent implements OnInit {
  personalList: Personal[]=[];
  dataTable: IPersonalTable[]=[];
  totalRecords: number = 0;
  selectedPersonal: Personal[]=[];
  grados: {label: string, value: string,img_name: string}[]=[];
  loading: boolean = true;
  sexos: IObjectModel[]=[];
  destinos: IObjectModel[] = [];
  escalafones: IObjectModel[] = [];
  escalas: IObjectModel[] = [];
  nivel_educativo: IObjectModel[] = [];
  situacion: IObjectModel[] = [];
  departamentos: IObjectModel[] = [];
  urlEdit: string = '../edit';

  colsTablaPersonalExport: any[]=[]; //array de columnas de la tabla
  nombre_archivo:string="Tabla de datos";
    // cols: any[];

    // loading: boolean;
    
    // representatives: Representative[];

  constructor(
    private personalService: PersonalService,
    public dataService: DataService,
    private readonly datePipe: DatePipe
  ) { }

  //ONINIT
  ngOnInit() {
    //inicializacion de cabeceras de columnas
    this.colsTablaPersonalExport = [      
      { field: 'id_personal', header: 'Id' },
      { field: 'apellido_1', header: 'Primer Apellido' },
      { field: 'apellido_1', header: 'Primer Apellido' },
      { field: 'nombre_1', header: 'Primer Nombre' },
      { field: 'nombre_2', header: 'Segundo Nombre' },
      { field: 'nombre_3', header: 'Tercer Nombre' },
      { field: 'grado.grado', header: 'Grado' },
      { field: 'dni', header: 'DNI' },
      { field: 'legajo', header: 'Legajo' },
      { field: 'sexo.sexo', header: 'Sexo' },
      { field: 'situacion.situacion', header: 'Situación' },
      { field: 'destino.destino', header: 'Destino' },
      { field: 'departamento.departamento', header: 'Departamento' },
      { field: 'division.division', header: 'División' },
      { field: 'sector.sector', header: 'Sector' },
      { field: 'seccion_guardia', header: 'Guardia' },
      { field: 'funcion', header: 'Función' },
      { field: 'escalafon.escalafon', header: 'Escalafón' },
      { field: 'escala_jerarquica.escala_jerarquica', header: 'Escala' },
      { field: 'nivel_educativo.nivel_educativo', header: 'Educación' },
      { field: 'nacionalidad', header: 'Nacionalidad' },
      { field: 'domicilio', header: 'Domicilio' },
      { field: 'provincia.provincia', header: 'Provincia' },
      { field: 'departamento_provincial.departamento_provincial', header: 'Dpto Provincial' },
      { field: 'municipio.municipio', header: 'Municipio' },
      { field: 'ciudad', header: 'Ciudad' },
    ];
    //FIN inicializacion de cabeceras de columnas
        
        const destino: number = globalConstants.destino_usuario;
        this.personalService.listarPersonal(destino).
                        subscribe(respuesta => {
            this.totalRecords = respuesta[1];
            this.personalList = respuesta[0];
            console.log("personal retornado", this.personalList);
            const lista = respuesta[0];
            
              });

              this.grados = grados.map(respuesta => {
                    return {
                      label: respuesta.grado.toLowerCase(),
                      value: respuesta.grado,
                      img_name: respuesta.grado.replace(' ','_')
                      }
              });
              
              this.sexos = sexos.map(respuesta => {
                return {
                  label: respuesta.sexo.toLowerCase(),
                  value: respuesta.sexo,
                 }
          });

          this.destinos = destinos.map(respuesta => {
            return {
              label: respuesta.destino.toLowerCase(),
              value: respuesta.destino } 
            });
          this.escalafones = escalafon.map(respuesta => {
            return {
              label: respuesta.escalafon.toLowerCase(),
              value: respuesta.escalafon } 
            });

          this.escalas = escalaJerarquica.map(respuesta => {
            return {
              label: respuesta.escala_jerarquica.toLowerCase(),
              value: respuesta.escala_jerarquica } 
            });

          this.nivel_educativo = nivelEducativo.map(respuesta => {
            return {
              label: respuesta.nivel_educativo.toLowerCase(),
              value: respuesta.nivel_educativo } 
            });

          this.situacion = situacion.map(respuesta => {
            return {
              label: respuesta.situacion.toLowerCase(),
              value: respuesta.situacion } 
            });

          this.departamentos =  departamentos.map(respuesta => {
              return {
                label: respuesta.departamento.toLowerCase(),
                value: respuesta.departamento } 
              });

              this.loading = false;
    

  }
  //fin oninit

  EditarPersonal(data: Personal){
    this.dataService.personalData = data;
  }

  MostrarSelected(){
    console.log('DATA SELECCIONADA', this.selectedPersonal);
    const selectedNewFormato = this.selectedPersonal.map(item =>{
    
      return {
        nombre: item.nombre_1,
        apellido: item.apellido_1,
        departamento:  item.departamento
      }
    });
    console.log('nuevo formato', selectedNewFormato);
  }

  printTabla() {
    
    printJS({
      
      printable: document.getElementById('personal-table'), 
      type: 'html', 
      header: 'PrintJS - Form Element Selection'

    })
  }
    
  //EXPORTAR A EXCEL
  exportExcel() {
    //mapeo de campos desde personal seleccionado para excel
    const selectedNewFormato = this.selectedPersonal.map(item =>{
      return {
        legajo: item.legajo,
        primer_apellido: item.apellido_1,
        segundo_apellido: item.apellido_2,
        primer_nombre: item.nombre_1,
        segundo_nombre: item.nombre_2,
        tercer_nombre: item.nombre_2,
        dni: item.dni,
        fecha_nacimiento: (item.fecha_nacimiento!=null)?this.datePipe.transform(item.fecha_nacimiento, "dd/MM/yyyy"):'',
        fecha_ingreso: (item.fecha_ingreso!=null)?this.datePipe.transform(item.fecha_ingreso, "dd/MM/yyyy"):'',
        ultimo_ascenso: (item.ultimo_ascenso!=null)?this.datePipe.transform(item.ultimo_ascenso, "dd/MM/yyyy"):'',
        cuil: item.cuil,
        sexo: (item.sexo)?(JSON.parse(JSON.stringify(item.sexo))).sexo:'',
        estado_civil: (item.estado_civil)?(JSON.parse(JSON.stringify(item.estado_civil))).estado_civil:'',
        destino: (item.destino)?(JSON.parse(JSON.stringify(item.destino))).destino:'',
        departamento: (item.departamento)?(JSON.parse(JSON.stringify(item.departamento))).departamento:'',
        division: (item.division)?(JSON.parse(JSON.stringify(item.division))).division:'',
        sector: (item.sector)?(JSON.parse(JSON.stringify(item.sector))).sector:'',
        seccion_guardia: (item.seccion_guardia)?(JSON.parse(JSON.stringify(item.seccion_guardia))).seccion: '',
        funcion: item.funcion,
        escalafon: (item.escalafon)?(JSON.parse(JSON.stringify(item.escalafon))).escalafon:'',
        escala_jerarquica: (item.escala_jerarquica)?(JSON.parse(JSON.stringify(item.escala_jerarquica))).escala_jerarquica:'',
        grado: (item.grado)?(JSON.parse(JSON.stringify(item.grado))).grado:'',
        nacionalidad: item.nacionalidad,
        domicilio: item.domicilio,
        provincia: (item.provincia)?(JSON.parse(JSON.stringify(item.provincia))).provincia:'',
        departamento_provincial: (item.departamento_provincial)?(JSON.parse(JSON.stringify(item.departamento_provincial))).departamento_provincial:'',
        municipio: (item.municipio)?(JSON.parse(JSON.stringify(item.municipio))).municipio:'',
        telefono: item.telefonos,
        email: item.email,
        altura: item.altura,
        peso: item.peso,
        nivel_educativo: (item.nivel_educativo)?(JSON.parse(JSON.stringify(item.nivel_educativo))).nivel_educativo:'',
        situacion: (item.situacion)?(JSON.parse(JSON.stringify(item.situacion))).situacion:'',
  
      }
    });

    //armado de archivo excel con lalista mapeada, utilizacion de metodo "saveAsExcelFile"para guardarlo  
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(selectedNewFormato);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Personal");
    });
  }
  //FIN EXPORTAR A EXCEL
  
  //METODO PARA GUARDAR EL ARCHIVO EXCEL
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  //FIN METODO PARA GUARDAR EL ARCHIVO EXCEL

    // cargarListaPersonal(event: LazyLoadEvent) {  
    //     this.loading = true;

    //     setTimeout(() => {
    //         this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
    //             this.customers = res.customers;
    //             this.totalRecords = res.totalRecords;
    //             this.loading = false;
    //         })
    //     }, 1000);
    // }

}
