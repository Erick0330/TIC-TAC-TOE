<template>
  <div class="contenedor">
    <div v-if="currentTheme?.id === 'Naruto'" class="konoha-background"></div>
    <div v-if="currentTheme?.id === 'Naruto'" class="konoha-overlay"></div>
    <div v-if="currentTheme?.id === 'One_Piece'" class="op-background"></div>
    <div v-if="currentTheme?.id === 'One_Piece'" class="op-overlay"></div>
    <div v-if="currentTheme?.id === 'Secret'" class="battle-background"></div>
    <div v-if="currentTheme?.id === 'Secret'" class="battle-overlay"></div>
    <div
      v-if="currentTheme?.id === 'Tierra-0'"
      class="default-background"
    ></div>

    <a @click.prevent="scrollToSection('Description')">
      <h2
        class="Mundo"
        :class="{
          'onepiece-mundo': currentTheme?.id === 'One_Piece',
          'konoha-mundo': currentTheme?.id === 'Naruto',
          'battle-mundo': currentTheme?.id === 'Secret'
        }"
      >
        {{ currentTheme.name}}
      </h2>
    </a>

    <div class="players">
      <p :class="{'konoha-players': currentTheme?.id === 'Naruto',
        'onepiece-players': currentTheme?.id === 'One_Piece',
        'battle-players': currentTheme?.id === 'Secret'
      }"
>
      X:
      <img
        v-if="currentTheme.id !== 'Tierra-0' && currentTheme?.icons.X"
        :src="currentTheme.icons.X"
        class="icon"
      />
      <span v-else class="X" :class="{ 'battle-players': currentTheme?.id === 'Secret'}">X</span>
    </p>
    <p :class="{'konoha-players': currentTheme?.id === 'Naruto',
        'onepiece-players': currentTheme?.id === 'One_Piece',
        'battle-players': currentTheme?.id === 'Secret'
      }">
      O:
      <img
        v-if="currentTheme.id !== 'Tierra-0' && currentTheme?.icons.O"
        :src="currentTheme?.icons.O"
        class="icon"
      />
      <span v-else class="O" :class="{ 'battle-players': currentTheme?.id === 'Secret'}">O</span>
    </p>
    </div>

    <div
      class="title"
    >
      <p
        v-if="!winner && !isDraw"
        :class="{
          'konoha-turn-text': currentTheme?.id === 'Naruto',
          'onepiece-turn-text': currentTheme?.id === 'One_Piece',
          'battle-turn-text': currentTheme?.id === 'Secret'
        }"
      >
        Turno de: {{ showCharacter() }}
      </p>
      <p
        class="Winner-text"
        v-else-if="winner"
        :class="{
          'konoha-winner-text': currentTheme?.id === 'Naruto',
          'onepiece-winner-text': currentTheme?.id === 'One_Piece',
          'battle-winner-text': currentTheme?.id === 'Secret'
        }"
      >
        🎉 ¡El ganador es: {{ showCharacter() }}! 🎉
      </p>
      <p
        class="Winner-text"
        v-else
        :class="{
          'konoha-draw-text': currentTheme?.id === 'Naruto',
          'onepiece-draw-text': currentTheme?.id === 'One_Piece',
          'battle-draw-text': currentTheme?.id === 'Secret'
        }"
      >
        🤝 ¡Es un empate! 🤝
      </p>
    </div>
    <div class="cont-board">
      <div class="board">
        <div
          v-for="(cell, index) in board"
          :key="index"
          class="cell"
          :class="{
            'x-cell': cell === 'X',
            'o-cell': cell === 'O',
            'winner-cell': isWinningCell(index),
            'konoha-cell': currentTheme?.id === 'Naruto',
            'onepiece-cell': currentTheme?.id === 'One_Piece',
            'battle-cell': currentTheme?.id === 'Secret'
          }"
          @click="cellClick(index)"
        >
          <img
            v-if="cell === 'O' && currentTheme?.icons.O"
            :src="currentTheme?.icons.O"
            class="icon"
          />
          <img
            v-else-if="cell === 'X' && currentTheme?.icons.X"
            :src="currentTheme?.icons.X"
            class="icon"
          />
          <span v-else>{{ cell }}</span>
        </div>
      </div>
    </div>

    <div
      class="restart"
      @click="restart"
      :class="{
        'konoha-restart': currentTheme?.id === 'Naruto',
        'onepiece-restart': currentTheme?.id === 'One_Piece',
        'battle-restart': currentTheme?.id === 'Secret'
      }"
    >
      <p>Reiniciar</p>
    </div>

    <div class="game-stats">
      <h2 >
        Estadísticas
      </h2>
      <ul>
        <li><span class="player-x">Victorias X:</span> {{ playerXWins }}</li>
        <li><span class="player-o">Victorias O:</span> {{ playerOWins }}</li>
        <li><span class="draws">Empates:</span> {{ draws }}</li>
      </ul>
    </div>

    <UnieverseDescription id="Description" class="description" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useCurrentPlayerStore } from "../stores/Game";
import type { CellValue, Player, Board } from "../types/GameTypes";
import UnieverseDescription from "./UnieverseDescription.vue";

export default defineComponent({
  setup() {
    window.scrollTo(0, 0);

    const audio = ref<HTMLAudioElement | null>(null); // Referencia para el audio
    const isAudioInitialized = ref(false); // Verifica si el audio ya fue inicializado
    const currentPlayerStore = useCurrentPlayerStore();
    const currentPlayer = computed(() => currentPlayerStore.getCurrentPlayer);
    const playerXWins = computed(() => currentPlayerStore.getPlayerXWins);
    const playerOWins = computed(() => currentPlayerStore.getPlayerOWins);
    const draws = computed(() => currentPlayerStore.getDraws);
    const currentTheme = computed(() => currentPlayerStore.currentTheme); // Acceso al tema actual
    const currentThemeMusic = computed(() => currentTheme.value.music); // Acceso al path de música
    const unlockSecret = computed(() => currentPlayerStore.unlockSecret);

    // Inicializa el tablero
    const board = ref<CellValue[]>(Array(9).fill(""));
    const winner = ref<Player | null>(null);
    const isDraw = ref(false);
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winningCells = ref<number[]>([]);

    // Reproduce música de fondo según el tema actual
    const playBackgroundMusic = () => {
      if (audio.value) {
        audio.value.pause();
        audio.value.currentTime = 0;
      }

      const musicPath = currentThemeMusic.value; // Obtener el path del audio desde el store
      if (musicPath) {
        audio.value = new Audio(musicPath);
        audio.value.loop = true; // Habilitar repetición
        audio.value.play().catch(() => {
          console.warn("El navegador bloqueó la reproducción automática.");
          enableAudioOnInteraction();
        });
      }
    };

    // Fallback para iniciar el audio tras la interacción del usuario
    const enableAudioOnInteraction = () => {
      const startAudio = () => {
        if (audio.value) {
          audio.value.play().then(() => {
            isAudioInitialized.value = true;
            document.removeEventListener("click", startAudio);
            document.removeEventListener("touchstart", startAudio);
          });
        }
      };
      document.addEventListener("click", startAudio);
      document.addEventListener("touchstart", startAudio);
    };

    // Cambia la música de fondo cuando el tema cambia
    watch(currentTheme, () => {
      playBackgroundMusic();
    });

    const cellClick = (index: number) => {
      if (board.value[index] !== "" || winner.value || isDraw.value) return;

      board.value[index] = currentPlayer.value;

      const result = checkWinner(board.value);
      if (result) {
        winner.value = result;

        if (result === "X") {
          currentPlayerStore.incrementPlayerXWins();
        } else if (result === "O") {
          currentPlayerStore.incrementPlayerOWins();
        }
      } else if (board.value.every((cell) => cell !== "")) {
        isDraw.value = true;
        currentPlayerStore.incrementDraws();
      } else {
        currentPlayerStore.switchPlayer();
      }
    };

    const checkWinner = (board: Board): Player | null => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
          winningCells.value = [a, b, c];
          return board[a] as Player;
        }
      }
      winningCells.value = [];
      return null;
    };

    const isWinningCell = (index: number) => {
      return winningCells.value.includes(index);
    };

    const restart = () => {
      if (unlockSecret.value === true && winner.value !== null && isDraw.value === false) {
        currentPlayerStore.changeSecrets();
      }

      if (winner.value != null) currentPlayerStore.nextTheme();

      board.value.fill("");
      winningCells.value = [];
      isDraw.value = false;
      if (winner.value == null) currentPlayerStore.switchPlayer();
      else {
        winner.value = null;
      }
      if (draws.value === 5) {
        currentPlayerStore.changeSecrets();
      }
    };

    const scrollToSection = (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const showCharacter = (): string => {
      let character = "X";

      if (currentPlayer.value === "X" && currentTheme.value.id === "Naruto")
        character = "Sasuke";
      else if (
        currentPlayer.value === "O" &&
        currentTheme.value.id === "Naruto"
      )
        character = "Naruto";
      else if (
        currentPlayer.value === "X" &&
        currentTheme.value.id === "One_Piece"
      )
        character = "Zoro";
      else if (
        currentPlayer.value === "O" &&
        currentTheme.value.id === "One_Piece"
      )
        character = "Sanji";
      else if (currentPlayer.value === "O") character = "O";

      return character;
    };

    // Reproduce música inicial al montar el componente
    playBackgroundMusic();

    return {
      currentPlayer,
      playerXWins,
      playerOWins,
      draws,
      board,
      winner,
      isDraw,
      cellClick,
      isWinningCell,
      restart,
      currentTheme,
      currentThemeMusic,
      scrollToSection,
      showCharacter,
      unlockSecret,
    };
  },

  components: {
    UnieverseDescription,
  },
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.contenedor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  margin-bottom: 0;
}

/* Tierra-0-------------------------------------------------------------------------------------------------------------- */
.default-background {
  background: url("/Tierra-0/Captura de pantalla (42).png")
    center/cover no-repeat;
  position: fixed; /* Cambiado de absolute a fixed */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Asegura que cubra toda la ventana */
  z-index: -1;
}

.players{
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;
}

.players p{
  font-size: 40px;
  margin: 5px;
}

.players span.X{
  color: #ff4136; /* Rojo para 'X' */
  text-shadow: 0 0 15px rgba(255, 65, 54, 0.7);
}

.players span.O{
  color: #2ecc40; /* Verde para 'O' */
  text-shadow: 0 0 15px rgba(46, 204, 64, 0.7);
}

a {
  text-decoration: none; /* Quita el subrayado por defecto */
  transition: color 0.3s, text-shadow 0.3s, transform 0.3s; /* Suaviza cambios */
  cursor: pointer;
}

a:hover {
  color: #f1c40f; /* Amarillo dorado al pasar el cursor */
  text-shadow: 0 0 10px #f39c12, 0 0 20px #d35400; /* Efecto de brillo */
  transform: scale(1.05); /* Aumenta ligeramente el tamaño */
}
.Mundo {
  font-size: 35px;
  color: #adebe6;
  text-shadow: 0 0 5px #52bbb4;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  color: #ffffff;
  word-break: break-word;
  width: 100%;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cell {
  width: 100px;
  height: 100px;
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6); /* Fondo oscuro */
  border: 2px solid #ffffff; /* Bordes blancos */
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s, color 0.3s;
}

/* Hover: efecto visual al pasar el ratón */
.cell:hover {
  background: rgba(0, 116, 217, 0.8); /* Azul claro al pasar el cursor */
  transform: scale(1.05); /* Aumenta ligeramente el tamaño */
}

/* Diferenciar 'X' y 'O' */
.x-cell {
  color: #ff4136; /* Rojo para 'X' */
  text-shadow: 0 0 15px rgba(255, 65, 54, 0.7);
}

.o-cell {
  color: #2ecc40; /* Verde para 'O' */
  text-shadow: 0 0 15px rgba(46, 204, 64, 0.7);
}

/* Celdas ganadoras */
.winner-cell {
  background: rgba(154, 67, 236, 0.8); /* para las celdas ganadoras */
  transform: scale(1.1); /* Aumentar ligeramente el tamaño */
  font-size: 48px; /* Aumentar el tamaño del contenido */
}

.winner-cell:hover {
  background: rgba(169, 91, 243, 0.8);
  transform: scale(1.05); /* Aumenta ligeramente el tamaño */
}

p {
  font-size: 30px;
  color: #c1f0ed;
  text-shadow: 0 0 15px #52bbb4;
}
.Winner-text {
  font-size: 35px;
  color: #6bf5ee;
  text-shadow: 0 0 15px #2a9992;
}

.restart {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border: 1px solid white;
  border-radius: 2px;
  background-color: #000428;
  width: 200px;
}

.restart p {
  font-size: 25px;
  color: #ffffff; /* Blanco para el texto inicial */
  transition: color 0.3s, font-size 0.3s;
  margin: 10px;
}

.restart:hover {
  background: #ffae42; /* Amarillo anaranjado para advertencia */
  transform: scale(1.05); /* Aumenta ligeramente el tamaño */
}

.restart:hover p {
  color: #2c2c2c; /* Gris oscuro para el texto */
  font-size: 27px;
  font-weight: bold;
  text-shadow: 0 0 10px #ffffff; /* Suave resplandor blanco */
}


/* Stats------------------------------------------------------------------------------------------------------ */
.game-stats {
  margin-top: 30px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  color: #ffffff;
  text-align: center;
  width: 300px;
}

.game-stats h2 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #c1f0ed;
  text-shadow: 0 0 10px #52bbb4;
}

.game-stats ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.game-stats li {
  margin: 5px 0;
  font-size: 18px;
}

.player-x {
  color: #ff4136;
  font-weight: bold;
}

.player-o {
  color: #2ecc40;
  font-weight: bold;
}

.draws {
  color: #f1c40f;
  font-weight: bold;
}

/* Konoha------------------------------------------------------------------------------------------------------------------- */
.konoha-background {
  background: url("/Naruto/782934-sasuke-and-naruto.jpg") center/cover
    no-repeat;
  filter: blur(8px); /* Aplica un desenfoque al fondo */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Coloca el fondo detrás de los demás elementos */
}



.konoha-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 145, 0, 0.3); /* Naranja translúcido */
  z-index: -1; /* Asegúrate de que la superposición esté detrás del contenido */
}

/* Paleta de colores para el tema Konoha */

.Mundo.konoha-mundo {
  color: #f1c40f; /* Amarillo dorado */
  text-shadow: 0 0 10px #d6b80c;
}

.konoha-cell {
  background-color: #f7c04a; /* Amarillo */
  color: #2c3e50; /* Texto oscuro */
}

.konoha-cell:hover {
  background-color: #f39c12; /* Naranja más vibrante */
  color: #fff; /* Texto blanco */
}

.winner-cell.konoha-cell {
  background-color: #d35400; /* Naranja profundo */
  color: #fff; /* Texto blanco */
}

.winner-cell.konoha-cell:hover {
  background-color: #f36c11; /* Naranja profundo */
  color: #fff; /* Texto blanco */
}

.konoha-restart {
  background-color: #e67e22; /* Naranja */
  color: #fff;
  border-radius: 10px;
}

.konoha-restart:hover {
  background-color: #d35400; /* Naranja oscuro */
  color: #fff;
}

/* Tema Konoha - Texto de turno */
.konoha-turn-text {
  color: #f1c40f; /* Amarillo dorado */
  text-shadow: 0 0 10px #d6b80c;
}

/* Tema Konoha - Texto de victoria */
.konoha-winner-text {
  color: #f1c40f; /* Amarillo dorado */
  text-shadow: 0 0 10px #d6b80c;
}

/* Tema Konoha - Texto de empate */
.konoha-draw-text {
  color: #f39c12; /* Naranja vibrante */
  text-shadow: 0 0 10px #d6b80c;
}

.konoha-players{
  color: #f1c40f; /* Amarillo dorado */
  text-shadow: 0 0 10px #d6b80c;
}

.icon {
  width: 40px;
  height: 40px;
  object-fit: contain; /* Mantener el aspecto del ícono */
}

.description {
  margin-top: 50px;
  margin-bottom: 50px;
}

/* One Piece----------------------------------------------------------------------------------------------------------- */
.op-background {
  background: url("/OnePiece/OnePiece.jpeg") center/cover no-repeat;
  filter: blur(8px); /* Aplica un desenfoque al fondo */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Coloca el fondo detrás de los demás elementos */
}

.op-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Negro translúcido */
  z-index: -1; /* Asegúrate de que la superposición esté detrás del contenido */
}

/* Estilo para las celdas */
.onepiece-cell {
  background-color: #d9534f; /* Rojo suave */
  color: #000; /* Texto negro */
}

.onepiece-cell:hover {
  background-color: #c9302c; /* Rojo más vibrante */
  color: #000; /* Texto negro */
}

.winner-cell.onepiece-cell {
  background-color: #b52e2e; /* Rojo oscuro */
  color: #fff; /* Texto blanco */
}

.winner-cell.onepiece-cell:hover {
  background-color: #9e1c1c; /* Rojo más intenso */
  color: #fff; /* Texto blanco */
}

.onepiece-restart {
  background-color: #07859b; /* Rojo suave */
  color: #ffffff; /* Texto blanco */
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.onepiece-restart:hover {
  background-color: #097486; /* Rojo más oscuro */
  color: #f8f6f6; /* Texto blanco */
}

.onepiece-restart:hover p {
  color: #f8f6f6; /* Texto blanco */
}

.onepiece-turn-text {
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #f2f2f3; /* Sombra azul */
}

/* Tema One Piece - Texto de victoria */
.onepiece-winner-text {
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #fafbfc; /* Sombra azul */
}

/* Tema One Piece - Texto de empate */
.onepiece-draw-text {
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #fafbfc; /* Sombra azul */
}

.onepiece-players{
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #fafbfc; /* Sombra azul */
}

/* Tema One Piece - Texto general */
.Mundo.onepiece-mundo {
  color: #ffffff; /* Blanco puro */
  text-shadow: 0 0 5px #fafbfc; /* Sombra azul */

}


  /* Fondo del tema "Batalla de Batallas" --------------------------------------------------------------------------------*/
  .battle-background {
  background: url("/Secreto/descargar.jfif") center/cover no-repeat;
  filter: blur(8px); /* Aplica un desenfoque al fondo */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Coloca el fondo detrás de los demás elementos */
}

.battle-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Negro translúcido */
  z-index: -1;
}

/* Texto del modo "Batalla de Batallas" */
.Mundo.battle-mundo {
  color: #ff1744; /* Rojo brillante */
  text-shadow: 0 0 15px #8e24aa, 0 0 30px #ff1744;
}

.players span.X.battle-players{
  color: #ff0000; /* Rojo intenso */
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.9), 0 0 30px #800000;
}

.players span.O.battle-players{
  color: #d400ff; /* Morado profundo */
  text-shadow: 0 0 20px rgba(164, 51, 245, 0.9), 0 0 30px #8b008b;
}
/* Estilos de las celdas */
.battle-cell {
  background-color: #4a148c; /* Morado oscuro */
  border: 2px solid #d50000; /* Bordes rojos */
  color: #ffffff;
  text-shadow: 0 0 10px #d50000;
  width: 120px; /* Tamaño ampliado */
  height: 120px; /* Tamaño ampliado */
}

.battle-cell:hover {
  background-color: #d50000; /* Rojo intenso */
  transform: scale(1.1);
  color: #fff;
  text-shadow: 0 0 20px #ff1744;
}

.battle-cell.x-cell {
  color: #ff0000; /* Rojo intenso */
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.9), 0 0 30px #800000;
}

.battle-cell.o-cell {
  color: #d400ff; /* Morado profundo */
  text-shadow: 0 0 20px rgba(135, 17, 219, 0.9), 0 0 30px #f50ef5;
}

.battle-players{
  color: #ff1744; /* Rojo brillante */
  text-shadow: 0 0 15px #8e24aa, 0 0 30px #ff1744;
}
/* Celdas ganadoras */
.winner-cell.battle-cell {
  background-color: #880e4f; /* Morado oscuro vibrante */
  color: #ffffff;
  transform: scale(1.15);
}

/* Botón de reinicio */
.battle-restart {
  background-color: #311b92; /* Azul profundo */
  color: #ffffff;
  border-radius: 8px;
  border: 2px solid #d50000; /* Bordes rojos */
}

.battle-restart:hover {
  background-color: #6200ea; /* Morado vibrante */
  color: #ffffff;
}

/* Texto general */
.battle-turn-text {
  color: #ff1744; /* Rojo brillante */
  text-shadow: 0 0 20px #8e24aa;
}

.battle-winner-text {
  color: #ff1744; /* Rojo brillante */
  text-shadow: 0 0 25px #ff1744, 0 0 35px #d50000;
}

.battle-draw-text {
  color: #ff4081; /* Rosa vibrante */
  text-shadow: 0 0 15px #f50057;
}

@media (max-width: 600px) {
  .cell {
    width: 80px;
    height: 80px;
    font-size: 28px;
  }

  .title {
    font-size: 18px;
  }

  .game-stats {
    margin-top: 60px;
  }
}
</style>
