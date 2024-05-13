import { ref } from 'vue';
import { router } from '../main';

export interface Anime {
  id: number;
  title: string;
  image_url: string;
}

export const favoriteAnimeList = ref<Anime[]>([]);

export const showConfirmation = ref(false);

// Aggiunge un anime alla lista dei preferiti
export const addToFavorites = (anime: Anime) => {
  if (!favoriteAnimeList.value.find(item => item.id === anime.id)) {
    favoriteAnimeList.value.push(anime);
    showConfirmation.value = true;
    setTimeout(() => {
      showConfirmation.value = false;
    }, 3000); 
  }
};

// Rimuove un anime dalla lista dei preferiti
export const removeFromFavorites = (anime: Anime) => {
  const index = favoriteAnimeList.value.findIndex(item => item.id === anime.id);
  if (index !== -1) {
    favoriteAnimeList.value.splice(index, 1);
  }
};

// Genera un anime casuale e lo aggiunge alla lista di anime casuali
export const generateRandomAnime = async (randomAnimeList: any) => {
  try {
    let retryCount = 0;
    let success = false;
    
    while (!success && retryCount < 5) {
      const randomId = Math.floor(Math.random() * 9000);
      // Effettua una richiesta GraphQL per ottenere i dettagli di un anime con l'id casuale
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              Media (id: ${randomId}, type: ANIME) {
                id
                title {
                  romaji
                }
                coverImage {
                  large
                }
                genres
              }
            }
          `
        })
      });
      const { data } = await response.json();
      if (data.Media) {
        if (!data.Media.genres.includes('Hentai') && !data.Media.genres.includes('Ecchi')) {
          const newAnime: Anime = {
            id: data.Media.id,
            title: data.Media.title.romaji,
            image_url: data.Media.coverImage.large
          };
          // Verifica se l'anime non è già presente nella lista di anime casuali prima di aggiungerlo
          if (!randomAnimeList.value.find((anime: Anime) => anime.id === newAnime.id)) {
            randomAnimeList.value.push(newAnime);
            success = true;
          }
        } else {
          retryCount++;
        }
      } else {
        retryCount++;
      }
    }
  } catch (error) {
    console.error('Errore durante il recupero dell\'anime casuale:', error);
  }
};

// Funzione per reindirizzare alla lista dei preferiti
export const showFavoritesList = () => {
  router.push('/favorites');
};
