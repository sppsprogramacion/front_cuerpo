
export class SeccionGuardia{
    id_seccion: number;
    seccion: string;
    departamento_id: number;

    constructor(
        id_seccion?: number,
        seccion?: string,
        departamento_id?: number,
    ){
        this.id_seccion=id_seccion!;
        this.seccion=seccion!;
        this.departamento_id=departamento_id!;
    }
        
}