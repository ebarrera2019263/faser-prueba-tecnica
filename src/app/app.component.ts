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
  nuevaTarea: Tarea = new Tarea(0, '', 0);


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
			this.nuevaTarea.minutos
		);

		// Agregarla al array de tareas
		this.tareas.push(nueva);

		// Limpiar el formulario
		this.nuevaTarea = new Tarea(0, '', 0);

		// (Opcional) Log para depuración
		console.log('Tarea agregada:', nueva);
		console.log('Tareas actualizadas:', this.tareas);
	}
}



