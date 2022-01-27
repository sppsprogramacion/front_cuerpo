import { DestinoModel } from './destino.model';
import { DepartamentoModel } from './departamento.model';
import { DivisionModel } from './division.model';
import { sectorModel } from './sector.model';
import { SeccionGuardia } from './seccion_guardia.model';
import { FuncionModel } from './funcion.model';


export class PersonalFuncionModel{
    constructor(
        public id_personal_funcion?: number,
        public legajo?: number,
        public destino_id?: number,
        public destino?: DestinoModel,
        public departamento_id? : number,
        public departamento?: DepartamentoModel,
        public division_id? : number,
        public division?: DivisionModel,
        public sector_id? : number,
        public sector? : sectorModel,
        public seccion_guardia_id? : number,
        public seccion_guardia? : SeccionGuardia,
        public funcion_id? : number,
        public funcion?: FuncionModel,
        public fecha?: Date,
        public instrumento?: string,
        public fojas? : number,
        public vigente?: boolean
    ){}

}

export interface ITrasladoTable{
    id_traslado?: number,
    dni_personal?: number,
    legajo?: number,
    destino_id?: number,
    destino?: DestinoModel,
    departamento_id? : number,
    departamento?: DepartamentoModel,
    division_id? : number,
    division?: DivisionModel,
    sector_id? : number,
    sector? : sectorModel,
    seccion_guardia_id? : number,
    seccion_guardia? : SeccionGuardia,
    funcion_id? : number,
    funcion?: FuncionModel,
    fecha?: Date,
    instrumento?: string,
    fojas? : number,
    vigente?: boolean
}