
export class SituacionModel{
    
    id_situacion: number;
    situacion: string;    

    constructor(
        id_situacion?: number,
        situacion?: string,        
    ){
        this.id_situacion = id_situacion!;
        this.situacion = situacion!;        
    }
}