<script setup lang="ts">
import { ref } from 'vue'; 
import RandomAnimeList from './RandomAnimeList.vue'; 
import { generateRandomAnime, addToFavorites } from '../utils/animeOperations'; 
import type { Anime } from '../utils/animeOperations'; 

const randomAnimeList = ref<Anime[]>([]); 
const showConfirmation = ref(false); 

// Funzione per generare un anime casuale e aggiungerlo alla lista
const generateRandomAnimeAndAddToList = async () => {
  await generateRandomAnime(randomAnimeList); 
};

// Funzione per gestire l'aggiunta di un anime ai preferiti
const addToFavoritesHandler = (anime: Anime) => {
  addToFavorites(anime); 
  showConfirmation.value = true;  
  setTimeout(() => {
    showConfirmation.value = false; 
  }, 3000); 
};
</script>

<template>
  <div class="font-sans bg-gray-900 text-white"> 
    <div class="container mx-auto px-4 py-8"> 
      <div class="flex justify-between items-center mb-8"> 
        <button @click="generateRandomAnimeAndAddToList" class="btn-generate bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"> 
          Genera Anime Casuale
        </button>
        <router-link to="/favorites" class="btn-favorites bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"> 
          Lista dei Preferiti
        </router-link>
      </div>
      <RandomAnimeList :animeList="randomAnimeList" :addToFavorites="addToFavoritesHandler" /> 
      <div v-if="showConfirmation" class="confirmation-message bg-gray-800 text-white p-4 text-center"> 
        Anime aggiunto ai preferiti con successo!
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px; 
  margin: 0 auto; 
}

.btn-generate,
.btn-favorites {
  transition: background-color 0.3s ease-in-out; 
}

.btn-generate:hover,
.btn-favorites:hover {
  background-color: #4f93e1; 
}

.confirmation-message {
  position: fixed; 
  bottom: 20px; 
  left: 50%; 
  transform: translateX(-50%); 
  background-color: rgba(255, 255, 255, 0.1); 
  border-radius: 8px; 
  padding: 10px 20px; 
  z-index: 999; 
}
</style>
