import { createRouter, createWebHistory } from 'vue-router'
import GamePresentation from '@/components/GamePresentation.vue'
import ContainerBoard from '@/components/ContainerBoard.vue'

const routes = [
  { path: '/', component: GamePresentation }, // Ruta inicial
  { path: '/container-board', component: ContainerBoard }, // Ruta para ContainerBoard
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
