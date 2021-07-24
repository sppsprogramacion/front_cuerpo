
export class DivisionModel{
   public id_division: number;
   public division: string;
   public departamento_id: number;
        
   constructor(
    id_division: number,
    division: string,
    departamento_id: number
   ){
        this.id_division = id_division;
        this.division = division;
        this.departamento_id = departamento_id;
   }


}