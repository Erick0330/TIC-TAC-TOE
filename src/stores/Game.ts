import { defineStore } from 'pinia';
import type { Player } from '../types/GameTypes';

export const useCurrentPlayerStore = defineStore('Game', {
  state: () => ({
    currentPlayer: 'X' as Player, // Inicializa currentPlayer con 'X'
    playerXWins: 0, // Contador de victorias de X
    playerOWins: 0, // Contador de victorias de O
    draws: 0,       // Contador de empates
    currentThemeId: 'Tierra-0', // Aquí guardamos el id del tema actual
    totalThemes: 3,
    unlockSecret: false,
    themes: [
      {
        id: 'Tierra-0',
        name: 'Tierra-0',
        icons: { X: null, O: null },
        description: 'La Tierra en la que vivimos, ese planeta al que llamamos casa. Este entorno se caracteriza por grandes conflictos internacionales y diferencias sociales bien marcadas, pero también por personas con gran corazón y valentía. Este planeta tiene más de 2000 años de historia donde incontables personas han contruibuido al avance de la tecnología y desarrollo del ser humano en la cima de la cadena alimenticia. En este planeta no eres nadie más que tu mismo demostrando tu valía y fuerza en esta batalla',
        music: '/Tierra-0/841799285.mp3'
      },
      {
        id: 'Naruto',
        name: 'Modo Konoha',
        icons: { X: '/Naruto/IconParkSolidLightning.svg', O: '/Naruto/FileIconsShuriken.svg' },
        description: 'El mundo ninja. Un universo donde las potencias militares son mayormente ninjas entrenados y altamente capacitados. Existen varias aldeas ocultas donde reciden estos poderosos shinobis gobernadas por los Kage, titulo que hereda el ninja más poderoso de cada una. En este universo los personajes que encarnan son Naruto y Sasuke, dos rivales increiblemente poderosos y con un fuertes principio que los guían en su camino ninja ',
        music: '/Naruto/26 - Reverse Situation~1.mp3'
      },
      {
        id: 'One_Piece',
        name: 'One Piece',
        icons: { X: '/OnePiece/GameIconsKatana.svg', O: '/OnePiece/MdiShoeFormal.svg' },
        description: 'La gran era pirata, ese es el nombre que define la situación del mundo actual. Hace tiempo el gran rey pirata Gol D. Roger antes de morir ejecutado reveló al mundo donde se encontraba su gran tesoro, el One Piece. Luego de eso muchos se han aventurado al mar para probar su suerte en busca del tesoro más grandioso de todos los tiempos. En esta ocasión los jugadores encarnan al espadachín cazador de piratas, Zoro, y al gran cocinero, Sanji pierna negra. Dos miembros de la tripulación que alberga al posible futuro rey de los piratas, Monkey D. Luffy',
        music: '/OnePiece/one piece cancion de pelea.mp3'
      },
      {
        id: 'Secret',
        name: 'Batalla de batallas',
        icons: { X: null, O: null },
        description: 'Han desbloqueado el modo secreto. Sus batallas han sido tan duras y parejas que un nuevo escenario de pelea se ha desbloqueado ante ustedes. La llamada Batalla de batallas en el centro de este multiverso. A partir de ahora no se moverán a no ser que halla un claro ganador. En este caso serán simplemente ustedes, con toda su experiecia y esfuerzo que los han llevado a este punto. Tengan la mejor pelea de todos los tiempos, y que gane el mejor',
        music: '/Secreto/BSO Star Wars Pelea Anakin vs Obi wan~1.mp3'
      }

    ],
  }),
  getters: {
    getCurrentPlayer: (state) => state.currentPlayer,
    getPlayerXWins: (state) => state.playerXWins,
    getPlayerOWins: (state) => state.playerOWins,
    getDraws: (state) => state.draws,
    currentTheme: (state) => state.themes.find(theme => theme.id === state.currentThemeId) || state.themes[0] // Obtiene el tema actual
  },
  actions: {
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
    incrementPlayerXWins() {
      this.playerXWins++;
    },
    incrementPlayerOWins() {
      this.playerOWins++;
    },
    incrementDraws() {
      this.draws++;
    },
    nextTheme() {
      if(this.currentThemeId !== 'Secret'){
        for (let i = 0; i < this.totalThemes; i++) {

          if (this.themes[i].id === this.currentThemeId) {
            if (i == this.totalThemes - 1)
              this.currentThemeId = this.themes[0].id;
            else
              this.currentThemeId = this.themes[i + 1].id;
            i = this.totalThemes;
          }
        }
      }
      else
       this.currentThemeId = this.themes[0].id;
    },
    changeSecrets(){
      if(this.unlockSecret === true){
        this.unlockSecret = false;
        this.nextTheme();
        this.draws = 0;
      }
      else{
        this.unlockSecret = true;
        this.currentThemeId = 'Secret';
      }

    }
  },
});
