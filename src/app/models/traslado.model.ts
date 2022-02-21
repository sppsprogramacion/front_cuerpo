import { DestinoModel } from './destino.model';
import { Personal } from './personal.model';


export class TrasladoModel{
    constructor(
        public id_traslado?: number,
        public dni_personal?: number,
        public legajo?: number,
        public personal?: Personal,
        public destino_id?: number,
        public destino?: DestinoModel,
        public fecha?: Date,
        public instrumento?: string,
        public fojas? : number,
        public vigente?: boolean,
        public confirmado?: boolean
    ){}

}

export interface ITrasladoTable{
    id_traslado?: number,
    dni_personal?: number,
    legajo?: number,
    destino_id?: number,
    destino?: string,
    fecha?: Date,
    instrumento?: string,
    fojas? : number,
    vigente?: boolean,
    confirmado?: boolean
}