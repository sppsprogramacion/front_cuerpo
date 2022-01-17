
export class SeccionGuardia{
    id_seccion: number;
    seccion: string;
    sector_id: number;

    constructor(
        id_seccion?: number,
        seccion?: string,
        sector_id?: number,
    ){
        this.id_seccion=id_seccion!;
        this.seccion=seccion!;
        this.sector_id=sector_id!;
    }
        
}