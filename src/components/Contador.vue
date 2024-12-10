<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="contenedor">
    <h2>Contador</h2>
    <h3>{{ numero }}</h3>

    <div class="botones">
      <button class="primer" @click="incrementar">Incrementar</button>
      <button @click="decrementar">Decrementar</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
  const numero = ref<number>(0);

  const incrementar = (): void => {
    numero.value += 1;
  };

  const decrementar = (): void => {
    numero.value -= 1;
  };
</script>

<style scoped>
  .botones{
    display: grid;
    padding: 20px 0;
  }

  .botones button{
    margin-bottom: 10px;
    width: 70%;
  }
</style>
