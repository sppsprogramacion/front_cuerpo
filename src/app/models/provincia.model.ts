
export class ProvinciaModel{
    
    id_provincia: number;
    provincia: string;    

    constructor(
        id_provincia?: number,
        provincia?: string,        
    ){
        this.id_provincia = id_provincia!;
        this.provincia = provincia!;        
    }
}