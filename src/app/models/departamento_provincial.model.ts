
export class DepartamentoProvincialModel{
    
    id_dpto_prov: number;
    departamento_provincial: string;
    provincia_id:number;    

    constructor(
        id_dpto_prov?: number,
        departamento_provincial?: string,  
        provincia_id?:number        
    ){
        this.id_dpto_prov = id_dpto_prov!;
        this.departamento_provincial = departamento_provincial!; 
        this.provincia_id = provincia_id!;       
    }
}