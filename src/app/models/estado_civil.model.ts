
export class EstadoCivilModel{
    
    id_estado_civil: number;
    estado_civil: string;    

    constructor(
        id_estado_civil?: number,
        estado_civil?: string,        
    ){
        this.id_estado_civil = id_estado_civil!;
        this.estado_civil = estado_civil!;        
    }
}