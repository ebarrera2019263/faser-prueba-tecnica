export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
       public seleccionada: boolean = false,//propiedad para poder seleccionar
       public destacada: boolean = false  // propiedad para tarea destacada
    ){}
}
