<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proyecto, i) in proyectosStore.proyectos" :key="i" class="hover">
          <th>{{ i + 1 }}</th>
          <td>{{ proyecto.nombre }}</td>
          <td>{{ proyecto.tareas.length }}</td>
          <td class="flex items-center">
            <progress :value="proyecto.progreso" class="progress progress-primary w-56" max="100"></progress>
            <span class="ml-2 text-sm font-bold">{{ proyecto.progreso }}%</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
    sub-title="Dale un nombre único a tu proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">Titulo del modal</h1>
    </template>

    <template #body>
      <p>
        Nulla consequat non ullamco mollit est quis duis pariatur cupidatat consequat Lorem cillum.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <AddCircle />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <ModalIcon />
  </fab-button>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { ref } from 'vue';
import { useProyectosStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);
const proyectosStore = useProyectosStore();

const onNewValue = (nombreProyecto: string) => {
  proyectosStore.agregarProyecto(nombreProyecto);
  modalOpen.value = false; // Cierra el modal después de agregar un nuevo proyecto
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.table thead {
  background-color: #60e493;
  color: white;
}

.table th, .table td {
  padding: 16px;
  text-align: left;
  font-weight: normal;
}

.table th {
  font-size: 1.1rem;
  text-transform: uppercase;
}

.table tbody tr {
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.3s ease;
}

.table tbody tr:hover {
  background-color: #f1f5f9;
}

.progress {
  border-radius: 8px;
  height: 12px;
  background-color: #e0e7ff; /* Fondo suave */
}

.progress-primary {
  background-color: #0df164; /* Color verde */
}

.text-sm {
  color: #1f2937;
}

.btn {
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #60e;
  color: white;
}

.btn-primary:hover {
  background-color: #0c0c0c;
}

.btn {
  background-color: #0df164;
  color: white;
}

.btn:hover {
  background-color: #0df164;
}
</style>
