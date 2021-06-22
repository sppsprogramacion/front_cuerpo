import { IDestino } from '../interfaces/destino.interface';


export class DestinoModel implements IDestino {
    id_destino: number;
    destino: string;
    
    constructor(id_destino: number, destino: string) {
           this.id_destino = id_destino;
           this.destino = destino;
    }
}