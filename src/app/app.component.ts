import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[] = [];
	nuevaTarea: Tarea = new Tarea(0, '', 0, false, false);
	ordenActual = { columna: '', asc: true };

	constructor(public service: AppService) {}

	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = (await this.service.obtenerTareas()).map(t => new Tarea(t.id, t.titulo, t.minutos, false, false));
	}

	agregarTarea() {
		if (!this.nuevaTarea.titulo || this.nuevaTarea.minutos <= 0) {
			alert('Debes ingresar un título y duración válida.');
			return;
		}

		const nueva = new Tarea(
			this.tareas.length + 1,
			this.nuevaTarea.titulo,
			this.nuevaTarea.minutos,
			false,
			false
		);

		this.tareas.push(nueva);
		this.nuevaTarea = new Tarea(0, '', 0, false, false);
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

	marcarComoDestacadas() {
		this.tareas.forEach(tarea => {
			if (tarea.seleccionada) {
				tarea.destacada = true;
				tarea.seleccionada = false; // opcional, para desmarcar
			}
		});
	}

  ordenarAleatorio() {
    this.tareas = this.tareas.sort(() => Math.random() - 0.5);
}

}
