
export class MunicipioModel{
    
    id_municipio: number;
    municipio: string;
    provincia_id:number; 
    departamento_id: number;   

    constructor(
        id_municipio?: number,
        municipio?: string,  
        provincia_id?:number,
        departamento_id?:number        
    ){
        this.id_municipio = id_municipio!;
        this.municipio = municipio!; 
        this.provincia_id = provincia_id!;  
        this.departamento_id = departamento_id!;     
    }
}