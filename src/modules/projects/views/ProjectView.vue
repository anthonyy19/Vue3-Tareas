<template>
  <div class="p-8 overflow-x-auto w-full">
    <h2> Nombre Proyecto: {{ proyectoActual?.nombre }}</h2>

    <div class="mt-4">
      <input 
        v-model="nuevaTarea" 
        type="text" 
        placeholder="Agregar nueva tarea" 
        class="input input-bordered mr-2" 
        :disabled="hasReachedLimit"
      />
      <button @click="agregarTarea" class="btn btn-primary" :disabled="hasReachedLimit">Agregar</button>
      <p v-if="hasReachedLimit" class="text-red-500 mt-2">No puedes agregar más de 10 tareas.</p>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Completada</th>
          <th>Tarea</th>
          <th>Fecha y hora de Registro</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarea, index) in proyectoActual?.tareas" :key="index">
          <td> {{ index + 1 }}</td>
          <td>
            <input
              type="checkbox"
              v-model="tarea.completada"
              @change="actualizarProgreso"
            />
          </td>
          <td v-if="!tarea.editando">{{ tarea.nombre }}</td>
          <td v-else>
            <input v-model="tarea.nombre" type="text" class="input input-bordered"/>
          </td>
          <td>{{ tarea.fechaRegistro }}</td>
          <td>
            <button v-if="!tarea.editando" @click="editarTarea(index)" class="icon-btn edit">
              🖉 <!-- Icono de edición mejorado -->
            </button>
            <button v-else @click="guardarEdicion(index)" class="icon-btn save">
              ✔️ <!-- Icono de guardar mejorado -->
            </button>
            <button @click="eliminarTarea(index)" class="icon-btn delete">
              🗑️ <!-- Icono de eliminar mejorado -->
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProyectosStore } from '../store/projects.store';

const proyectosStore = useProyectosStore();
const route = useRoute();
const nuevaTarea = ref('');

// Computed property to get the current project
const proyectoActual = computed(() =>
  proyectosStore.proyectos.find((proyecto) => proyecto.id === route.params.id)
);

// Computed property to check if the limit of tasks has been reached
const hasReachedLimit = computed(() => {
  return proyectoActual.value && proyectoActual.value.tareas.length >= 10;
});

// Function to add a new task with current date and time
const agregarTarea = () => {
  if (nuevaTarea.value.trim() !== '' && !hasReachedLimit.value) {
    const nuevaFecha = new Date().toLocaleString();
    proyectosStore.agregarTarea(route.params.id as string, nuevaTarea.value.trim(), nuevaFecha);
    nuevaTarea.value = '';
  }
};

// Function to toggle edit mode for a task
const editarTarea = (index: number) => {
  proyectoActual.value!.tareas[index].editando = true;
};

// Function to save edited task
const guardarEdicion = (index: number) => {
  proyectoActual.value!.tareas[index].editando = false;
  actualizarProgreso(); // Update progress after editing
};

// Function to delete a task
const eliminarTarea = (index: number) => {
  proyectoActual.value!.tareas.splice(index, 1);
  actualizarProgreso(); // Update progress after deletion
};

// Function to update progress in the store
const actualizarProgreso = () => {
  proyectosStore.actualizarProgreso(route.params.id as string);
};
</script>
<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 8px; /* Esquinas redondeadas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.table th, .table td {
  padding: 12px 15px; /* Espaciado interno */
  text-align: left; /* Alinear texto a la izquierda */
}

.table th {
  background-color: #60e493; /* Azul suave */
  color: white; /* Texto blanco */
  font-weight: bold; /* Texto en negrita */
  border-top-left-radius: 8px; /* Esquinas redondeadas en la parte superior izquierda */
  border-top-right-radius: 8px; /* Esquinas redondeadas en la parte superior derecha */
}

.table tbody tr {
  border-bottom: 1px solid #e2e8f0; /* Línea entre filas */
}

.table tbody tr:nth-child(even) {
  background-color: #f7fafc; /* Color de fondo para filas pares */
}

.table tbody tr:hover {
  background-color: #e2e8f0; /* Color de fondo al pasar el mouse */
}

.icon-btn {
  padding: 8px;
  border-radius: 50%;
  font-size: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-btn.edit {
  background-color: #4f83e4; /* Azul */
  color: white;
}

.icon-btn.edit:hover {
  background-color: #3b6cb3; /* Azul más oscuro */
}

.icon-btn.save {
  background-color: #38a169; /* Verde */
  color: white;
}

.icon-btn.save:hover {
  background-color: #2f7a4f; /* Verde más oscuro */
}

.icon-btn.delete {
  background-color: #e53e3e; /* Rojo */
  color: white;
}

.icon-btn.delete:hover {
  background-color: #c53030; /* Rojo más oscuro */
}

.text-red-500 {
  color: #e53e3e; /* Rojo */
}

.input {
  border: 1px solid #d1d5db; /* Borde gris claro */
  border-radius: 5px; /* Esquinas redondeadas */
  padding: 8px; /* Espaciado interno */
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #4f83e4; /* Borde azul en foco */
  outline: none; /* Sin borde de enfoque predeterminado */
}
</style>
