import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
  nuevaTarea: Tarea = new Tarea(0, '', 0); // agregamos una variable para poder agregar nuevas tareas a la tabla
  ordenActual = { columna: '', asc: true }; //agregamos una variable para guardar cuál columna estamos ordenando y en qué dirección



	constructor(
        public service: AppService,
	) { }

	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

//creacion de metodo para agregar las tareas
	agregarTarea() {
    if(!this.nuevaTarea.titulo || this.nuevaTarea.minutos <=0) {
      alert('debe ingresar un titulo y duracion')
      return;

    }

    const nueva = new Tarea(
      this.tareas.length + 1,
      this.nuevaTarea.titulo,
      this.nuevaTarea.minutos,
      false  // Seleccionada inicia como false
  );


		// Agregarla al array de tareas
		this.tareas.push(nueva);

		// Limpiar el formulario
		this.nuevaTarea = new Tarea(0, '', 0);

		// (Opcional) Log para depuración
		console.log('Tarea agregada:', nueva);
		console.log('Tareas actualizadas:', this.tareas);
	}


  eliminarTareasSeleccionadas() {
    this.tareas = this.tareas.filter(tarea => !tarea.seleccionada);
}

ordenarPor(columna: string) {
  if (this.ordenActual.columna === columna) {
      this.ordenActual.asc = !this.ordenActual.asc;
  } else {
      this.ordenActual.columna = columna;
      this.ordenActual.asc = true;
  }

  this.tareas.sort((a, b) => {
      const valorA = a[columna as keyof Tarea];
      const valorB = b[columna as keyof Tarea];

      if (valorA < valorB) {
          return this.ordenActual.asc ? -1 : 1;
      }
      if (valorA > valorB) {
          return this.ordenActual.asc ? 1 : -1;
      }
      return 0;
  });
}

}


