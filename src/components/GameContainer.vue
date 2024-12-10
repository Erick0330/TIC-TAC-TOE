<template>
  <div class="game-container">
    <div class="titulo" :class="{'konoha-title': currentTheme?.id === 'Naruto',
      'onepiece-title': currentTheme?.id === 'One_Piece',
      'battle-title': currentTheme?.id === 'Secret'
    }">
      <h1>TIC-TAC-TOE</h1>
    </div>

    <router-view class="views" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { computed } from "vue";
import { useCurrentPlayerStore } from "../stores/Game";


export default defineComponent({
  setup(){
    const currentPlayerStore = useCurrentPlayerStore();
    const currentTheme = computed(() => currentPlayerStore.currentTheme); // Accedemos al getter `currentTheme`

    return{ currentTheme,}

  },


  components: {

  },
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  color: #ffffff;
  margin: 0; /* Elimina márgenes */
  padding: 0; /* Elimina padding */
  box-sizing: border-box; /* Incluye padding y bordes en el cálculo de dimensiones */

}

.titulo{
  margin-top: 20px;
  margin-bottom: 10px
}

h1{
  font-size: 50px;
  color: #adebe6;
  text-shadow: 0 0 15px #52bbb4;
  font-weight: bold;
}

.konoha-title h1{
  color: #f1c40f; /* Amarillo dorado */
  font-weight: bold;
  text-shadow: 0 0 10px #d6b80c;
}

.onepiece-title h1{
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #fafbfc; /* Sombra azul */
}


.battle-title h1{
  color: #ff1744; /* Rojo brillante */
  text-shadow: 0 0 15px #8e24aa, 0 0 30px #ff1744;
}

.views{
  width: 80%;
  margin-bottom: 0;
}
</style>
