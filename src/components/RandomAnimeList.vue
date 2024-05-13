<script setup lang="ts">
import type { Anime } from '../utils/animeOperations';
import { defineProps } from 'vue';

const { animeList, addToFavorites } = defineProps<{
  animeList: Anime[]; 
  addToFavorites: Function; 
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="anime in animeList" :key="anime.id" class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img class="object-cover w-full h-60 md:h-72 rounded-t-lg" :src="anime.image_url" :alt="anime.title" />
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-2 text-white">{{ anime.title }}</h2>
        <button @click="addToFavorites(anime)" class="btn-add-favorite block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Aggiungi ai Preferiti
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-add-favorite {
  transition: background-color 0.3s ease-in-out;
}

.btn-add-favorite:hover {
  background-color: #1e3a8a;
}

@media (max-width: 640px) {
  .object-cover {
    height: 150px; 
  }
}
</style>
