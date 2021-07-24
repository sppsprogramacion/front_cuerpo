
export class EscalafonModel{
    id_escalafon: number;
    escalafon: string;

    constructor(
        id_escalafon?: number,
        escalafon?: string,
    ){
        this.id_escalafon = id_escalafon!;
        this.escalafon = escalafon!;        
    }

}