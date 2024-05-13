<script setup lang="ts">
import { favoriteAnimeList, removeFromFavorites } from '../utils/animeOperations';
import { ref, computed } from 'vue';
import type { Anime } from '../utils/animeOperations';
import { router } from '../main'; 

const searchText = ref('');

const filteredFavoriteAnimeList = computed(() => {
  const query = searchText.value.toLowerCase();
  return favoriteAnimeList.value.filter((anime: Anime) => anime.title.toLowerCase().includes(query));
});

const goToAnimeGenerationPage = () => {
  router.push('/');
};
</script>

<template>
  <div class="favorites-page bg-gray-900 py-12">
    <h1 class="text-3xl font-semibold text-center mb-8 text-white">Lista dei Preferiti</h1>
    <input type="text" v-model="searchText" placeholder="Cerca anime..." class="w-full px-4 py-2 rounded-md mb-6 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500">
    <div v-if="filteredFavoriteAnimeList.length === 0" class="text-center text-gray-500">Nessun anime nei preferiti.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      <div v-for="anime in filteredFavoriteAnimeList" :key="anime.id" class="bg-white rounded-lg shadow-md overflow-hidden relative">
        <img :src="anime.image_url" :alt="anime.title" class="object-cover w-full h-64 rounded-t-lg">
        <h2 class="p-4 text-xl font-semibold">{{ anime.title }}</h2>
        <button @click="removeFromFavorites(anime)" class="btn-remove-from-favorites absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">
          Rimuovi dai Preferiti
        </button>
      </div>
    </div>
    <button @click="goToAnimeGenerationPage" class="btn-generate bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-8">
      Torna per generare altre serie
    </button>
  </div>
</template>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.btn-remove-from-favorites {
  transition: background-color 0.3s ease-in-out;
}

.btn-remove-from-favorites:hover {
  background-color: #ef4444;
}

.btn-generate {
  transition: background-color 0.3s ease-in-out;
}

.btn-generate:hover {
  background-color: #4f93e1;
}
</style>
