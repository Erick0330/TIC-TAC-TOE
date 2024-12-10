<template>
  <div class="text">
    <h2 :class="{'konoha-title': currentTheme?.id === 'Naruto',
      'onepiece-title': currentTheme?.id === 'One_Piece',
      'battle-title': currentTheme?.id === 'Secret'
    }">{{ currentTheme.name }}</h2>
    <p :class="{'konoha-title': currentTheme?.id === 'Naruto',
      'onepiece-title': currentTheme?.id === 'One_Piece',
      'battle-title': currentTheme?.id === 'Secret'
    }">{{ currentTheme.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCurrentPlayerStore } from "../stores/Game";

const currentPlayerStore = useCurrentPlayerStore();
const currentTheme = computed(() => currentPlayerStore.currentTheme); // Accedemos al getter `currentTheme`


</script>

<style scoped>
.text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;
}

h2{
  font-size: 35px;
  color: #adebe6;
  text-shadow: 0 0 5px #52bbb4;
}

p{
  font-size: 20px;
  text-align: justify;
  margin-bottom: 5px;
  color: #adebe6;
}

h2.konoha-title{
  color: #f1c40f; /* Amarillo dorado */
  text-shadow: 0 0 10px #d6b80c;
}

p.konoha-title{
  color: #f1c40f; /* Amarillo dorado */
}

h2.onepiece-title{
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #fafbfc; /* Sombra azul */
}

p.onepiece-title{
  color: #ffffff; /* Blanco puro */
}

h2.battle-title{
  color: #ff1744; /* Rojo brillante */
  text-shadow: 0 0 15px #8e24aa, 0 0 30px #ff1744;
}

p.battle-title{
  color: #ff1744; /* Rojo brillante */
}
</style>
