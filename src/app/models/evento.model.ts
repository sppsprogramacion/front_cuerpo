export class EventoModel{
    
    public id_evento: number;       
    public detalle: string;
    public indice: number;
    public fecha_inicio: Date;
    public fecha_fin: Date;
    

    constructor(
        id_evento?: number,
           detalle?: string,
           indice?: number,
           fecha_inicio?: Date,
           fecha_fin?: Date,
    ){
    this.id_evento = id_evento!;  
    this.detalle = detalle!;
    this.indice = indice!;
    this.fecha_inicio = fecha_inicio!;
    this.fecha_fin = fecha_fin!;
    }
}