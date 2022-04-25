import { DestinoModel } from './destino.model';
import { Personal } from './personal.model';
import { GradoModel } from './grado.model';
import { EscalafonModel } from './escalafon.model';


export class AscensoModel{
    constructor(
        public id_ascenso?: number,
        public dni_personal?: number,
        public legajo?: number,
        public personal?: Personal,
        public grado_id?: number,
        public grado?: GradoModel,
        public escalafon_id?: number,
        public escalafon?: EscalafonModel,
        public fecha_ascenso?: Date,
        public instrumento?: string,
        public vigente?: boolean,
        public orden?: number,
        public anio_orden?: number,
        public instrumento_orden?: string,
        public fecha_instrumento_orden?:Date

    ){}

}

export interface IAscensoTable{
    id_ascenso?: number,
    dni_personal?: number,
    legajo?: number,
    grado_id?: number,
    escalafon_id?: number,
    fecha_ascenso?: Date,
    instrumento?: string,
    vigente?: boolean,
    orden?: number,
    anio_orden?: number,
    instrumento_orden?: string,
    fecha_instrumento_orden?:Date
}