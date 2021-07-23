
export class DepartamentoModel{
       id_departamento: number;
       departamento: string;
       destino_id : number;
    constructor(
        id_departamento?: number,
        departamento?: string,
        destino_id ?: number,
    
    ){
        this.id_departamento = id_departamento!;
        this.departamento= departamento!;
        this.destino_id = destino_id!;
    }
}