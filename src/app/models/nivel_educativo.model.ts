
export class NivelEducativoModel{
    
    id_nivel_educativo: number;
    nivel_educativo: string;    

    constructor(
        id_nivel_educativo?: number,
        nivel_educativo?: string,        
    ){
        this.id_nivel_educativo = id_nivel_educativo!;
        this.nivel_educativo = nivel_educativo!;        
    }
}