import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AnimeList from './components/AnimeList.vue';
import FavoritesPage from './components/FavoritesPage.vue';
import 'tailwindcss/tailwind.css';

const router = createRouter({
  history: createWebHistory(), 
  routes: [
    { path: '/', component: AnimeList }, 
    { path: '/favorites', component: FavoritesPage } 
  ]
});

const app = createApp(App); 
app.use(router); 
app.mount('#app');

export { router };
