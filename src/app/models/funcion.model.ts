
export class FuncionModel{
    
    id_funcion: number;
    funcion: string;
    

    constructor(
        id_funcion?: number,
        funcion?: string,
       
    ){
        this.id_funcion = id_funcion!;
        this.funcion = funcion!;
        
    }
}