
export class CiudadModel{
    
    id_ciudad: number;
    ciudad: string;
    municipio_id:number; 
    provincia_id: number;   

    constructor(
        id_ciudad?: number,
        ciudad?: string,  
        municipio_id?:number,
        provincia_id?:number        
    ){
        this.id_ciudad = id_ciudad!;
        this.ciudad = ciudad!; 
        this.municipio_id = municipio_id!;  
        this.provincia_id = provincia_id!;     
    }
}