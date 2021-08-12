export class PdfModel{
    
    public id_archivo: number;
    public legajo_personal: number;
    public nombre_archivo: string;    
    public detalle: string;
    public indice: number;
    public fecha_documento: Date;
    

    constructor(
           id_archivo?: number,
           legajo_personal?: number,
           nombre_archivo?: string,    
           detalle?: string,
           indice?: number,
           fecha_documento?: Date,
    ){
    this.id_archivo = id_archivo!;
    this.legajo_personal = legajo_personal!;
    this.nombre_archivo = nombre_archivo!;    
    this.detalle = detalle!;
    this.indice = indice!;
    this.fecha_documento = fecha_documento!;
    }
}