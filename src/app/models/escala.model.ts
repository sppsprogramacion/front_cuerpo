
export class EscalaJerarquicaModel{
    id_escala_jerarquica: number;
    escala_jerarquica: string;

    constructor(
        id_escala_jerarquica?: number,
        escala_jerarquica?: string,
    ){
        this.id_escala_jerarquica = id_escala_jerarquica!;
        this.escala_jerarquica = escala_jerarquica!;
    }
}