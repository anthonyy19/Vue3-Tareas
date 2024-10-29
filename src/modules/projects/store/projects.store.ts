// projects.store.ts

import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as { 
      id: string, 
      nombre: string; 
      tareas: { id: string; nombre: string; completada: boolean; fechaRegistro: string }[]; 
      progreso: number 
    }[],
  }),

  actions: {
    agregarProyecto(nombreProyecto: string) {
      const proyecto = { 
        id: Date.now().toString(), 
        nombre: nombreProyecto, 
        tareas: [], 
        progreso: 0 
      };
      this.proyectos.push(proyecto);
    },

    agregarTarea(idProyecto: string, nombreTarea: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        const fechaRegistro = new Date().toLocaleString();
        
        proyecto.tareas.push({
          id: Date.now().toString(),
          nombre: nombreTarea,
          completada: false,
          fechaRegistro: fechaRegistro,
          
        });
      }
    },

    actualizarProgreso(idProyecto: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        const tareasCompletadas = proyecto.tareas.filter((tarea) => tarea.completada).length;
        
        // Limitar el progreso al 100% y contar solo hasta 10 tareas
        const limiteTareas = 10;
        const progresoPorTarea = 100 / limiteTareas;
        const nuevoProgreso = Math.min(tareasCompletadas * progresoPorTarea, 100);

        proyecto.progreso = nuevoProgreso;
      }
    }
  }
});
