<template>
  <div id="app">
    <GameContainer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameContainer from "./components/GameContainer.vue";

export default defineComponent({
  components: {
    GameContainer,
  },
});
</script>

<style scoped>
html,
body,
#app {
  margin: 0; /* Elimina los márgenes por defecto */
  padding: 0; /* Elimina el relleno por defecto */
  /* background: linear-gradient(to bottom, #000428, #004e92); */
  color: #ffffff;
  font-family: Arial, sans-serif;
  display: flex; /* Habilita el uso de Flexbox */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100%;
  width: 100%;
}

</style>
