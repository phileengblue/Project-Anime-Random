<script setup lang="ts">
import type { Anime } from '../utils/animeOperations';
defineProps<{
  favoriteAnimeList: Anime[];
}>();
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold mb-6 text-white">Lista dei Preferiti</h2>
    <div v-if="favoriteAnimeList.length === 0" class="text-gray-400 text-center">Nessun anime nei preferiti.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="anime in favoriteAnimeList" :key="anime.id" class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img class="object-cover w-full h-72 rounded-t-lg" :src="anime.image_url" :alt="anime.title" />
        <h2 class="p-4 text-lg font-semibold text-white">{{ anime.title }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-3xl {
  font-size: 1.875rem; 
}

.bg-gray-800 {
  background-color: #1f2937; 
}

.object-cover {
  object-fit: cover; 
}

.w-full {
  width: 100%; 
}

.h-72 {
  height: 18rem; 
}

.rounded-t-lg {
  border-top-left-radius: 0.5rem; 
  border-top-right-radius: 0.5rem; 
}

.p-4 {
  padding: 1rem; 
}

.text-lg {
  font-size: 1.125rem; 
}

.font-semibold {
  font-weight: 600; 
}
</style>
