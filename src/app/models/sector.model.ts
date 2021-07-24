
export class sectorModel{
    id_sector: number;
    sector: string;
    division_id : number;

    constructor(
        id_sector?: number,
        sector?: string,
        division_id?: number,
    ){
        this.id_sector= id_sector!;
        this.sector= sector!;
        this.division_id = division_id!;
    }



}