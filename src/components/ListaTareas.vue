<template>
  <div class="contenedor">
    <h2>Lista de Tareas</h2>

    <input type="text" v-model="nuevaTarea" @keyup.enter="addTarea">

    <ul>
      <li v-for="(tarea, index) in tareas " :key="index">
        {{ tarea }}

        <button @click="deleteTarea(index)">Borrar</button>
      </li>
    </ul>
  </div>


</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const tareas = ref<string[]>([]);
  const nuevaTarea = ref<string>('');

  const addTarea = (): void =>{
    tareas.value.push(nuevaTarea.value);
    nuevaTarea.value = '';
  }

  const deleteTarea = (index:number): void => {
    tareas.value.splice(index,1);
  }
</script>

<style>
</style>
