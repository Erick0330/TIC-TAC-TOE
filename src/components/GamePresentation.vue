<template>
  <div class="mensaje">
    <div class="background"></div>
    <h2>Bienvenido al TIC-TAC-TOE multiversal</h2>

    <p class="text">
      En este juego van a navegar por los distintos universos anime teniendo
      peleas únicas y emociantes. Cada batalla tendrá lugar en un mundo
      diferente y solo podrán navegar al siguiente una vez que halla un ganador.
      Para viajar entre universos solo deben presionar el boton reiniciar y
      cumplir con la condición anterior. Además en cada uno, justo debajo de la
      Seccion de Stats tendrás una breve explicación de la situación en la que
      se encuentra dicho universo. Cuando gane un jugador, al tocar el boton de
      reinicar, en la siguiente partida comenzará precisamente el que halla
      ganado; el primer movimiento es un derecho que debes obtener. Además si
      tocan este botón, y estás en el medio de una partida, en la siguiente
      comenzará el jugador que no lo halla tocado.Presiona el boton de abajo
      cuando estén listos para inicar la aventura mas emocionante en el
      TIC-TAC-TOE.
    </p>
    <div class="empezar" @click="goToContainerBoard">
      <p>Empezar la aventura</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToContainerBoard = () => {
  router.push("/container-board");
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mensaje {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* Centra el texto */
  padding: 5px;
  box-sizing: border-box; /* Incluye padding en el tamaño total */
  max-width: 900px;
}

.background {
  background: url("/Tierra-0/Captura de pantalla (42).png")
    center/cover no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Asegura que cubra toda la ventana */
  z-index: -1;
}

h2 {
  margin-bottom: 5px;
  font-size: 40px;
  color: #adebe6;
  text-shadow: 0 0 5px #52bbb4;
}

.mensaje .text {
  font-size: 30px;
  text-align: justify;
  margin-bottom: 5px;
  color: #adebe6;
  text-shadow: 0 0 5px #52bbb4;
}

p {
  max-width: 90%; /* Restringe el ancho del texto para pantallas pequeñas */
}

.empezar {
  display: flex;
  padding: 10px;
  justify-content: center;
  margin-top: 20px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #000428;
  min-width: 50%;
  cursor: pointer;
  transition: transform 0.3s;
}

.empezar p {
  font-size: 25px;
  color: #ffffff;
  transition: color 0.3s, font-size 0.3s;
  margin: 0;
}

.empezar:hover {
  background: #ffae42;
  transform: scale(1.05);
}

.empezar:hover p {
  color: #2c2c2c;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 0 0 10px #ffffff;
}
</style>
