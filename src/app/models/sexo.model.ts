
export class SexoModel{
    
    id_sexo: number;
    sexo: string;    

    constructor(
        id_sexo?: number,
        sexo?: string,        
    ){
        this.id_sexo = id_sexo!;
        this.sexo = sexo!;        
    }
}