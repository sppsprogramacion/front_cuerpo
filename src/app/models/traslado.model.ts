import { DestinoModel } from './destino.model';


export class TrasladoModel{
    constructor(
        public id_traslado?: number,
        public dni_personal?: number,
        public legajo?: number,
        public destino_id?: number,
        public destino?: DestinoModel,
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
    destino?: string,
    fecha?: Date,
    instrumento?: string,
    fojas? : number,
    vigente?: boolean
}