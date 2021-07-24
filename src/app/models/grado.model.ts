
export class GradoModel{
    
    id_grado: number;
    grado: string;
    escala_jerarquica_id : number;
    jerarquia_id : number;

    constructor(
        id_grado?: number,
        grado?: string,
        escala_jerarquica_id? : number,
        jerarquia_id? : number,
    ){
        this.id_grado = id_grado!;
        this.grado = grado!;
        this.escala_jerarquica_id = escala_jerarquica_id!;
        this.jerarquia_id = jerarquia_id!;
    }
}