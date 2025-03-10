<template>
  <div class="pokedex">
    <div class="search-container">
      <img src="@/assets/img/search.svg" alt="Search" class="search-icon" />
      <input v-model="searchQuery" type="text" placeholder="Search" class="search-bar" />
    </div>

    <div v-if="filteredList.length === 0" class="no-results">
      <h1 class="text-title">Uh-oh!</h1>
      <p class="text-description">
        You look lost on your journey!
      </p>
      <router-link to="/" class="mt-6">
        <button class="stard-btn">
          Go back home
        </button>
      </router-link>
    </div>
    <div v-else>
      <ul class="pokemon-list">
        <li v-for="pokemon in paginatedList" :key="pokemon.name" class="pokemon-item">
          <button
            @click="openModal(pokemon)"
            class="pokemon-name"
            style="background: none; border: none; cursor: pointer;"
          >
            {{ pokemon.name }}
          </button>

          <button @click="toggleFavorite(pokemon)" class="favorite-btn">
            <img :class="{ flipping: flippingPokemon === pokemon.name }"
                 :src="getStarImage(pokemon)" 
                 alt="Favorito" />
          </button>
        </li>
      </ul>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">«</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">»</button>
      </div>
    </div>
  </div>

  <div class="filter-buttons">
    <button @click="showAll" :class="{ active: !showFavorites }" class="filter-btn all-btn">
      <img src="@/assets/img/all.svg" alt="All" class="icon" />
      All
    </button>
    <button @click="showOnlyFavorites" :class="{ active: showFavorites }" class="filter-btn fav-btn">
      <img src="@/assets/img/StarFav.svg" alt="Favorites" class="icon" />
      Favorites
    </button>
  </div>

  <PokemonModal 
    v-if="isModalOpen" 
    :pokemon="selectedPokemon" 
    :isOpen="isModalOpen" 
    @close="closeModal" 
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePokemonStore } from '@/app/store/pokemon.store';
import PokemonModal from '@/app/components/PokemonDetailsModal.vue';

const store = usePokemonStore();
store.fetchAllPokemon();

const searchQuery = ref('');
const showFavorites = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(20);

watch(searchQuery, () => {
  currentPage.value = 1;
});

const isModalOpen = ref(false);
const selectedPokemon = ref(null);

const openModal = (pokemon) => {
  selectedPokemon.value = pokemon;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedPokemon.value = null;
};

const getStarImage = (pokemon) => {
  return isFavorite(pokemon)
    ? new URL('@/assets/img/Star.svg', import.meta.url).href
    : new URL('@/assets/img/OffStar.svg', import.meta.url).href;
};

const flippingPokemon = ref(null);

const filteredList = computed(() => {
  const list = showFavorites.value ? store.favorites : store.allPokemon;
  return list.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const totalPages = computed(() => Math.ceil(filteredList.value.length / itemsPerPage.value));

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredList.value.slice(start, start + itemsPerPage.value);
});

const favoritesSet = computed(() => new Set(store.favorites.map(p => p.name)));
const isFavorite = (pokemon) => favoritesSet.value.has(pokemon.name);

const toggleFavorite = (pokemon) => {
  flippingPokemon.value = pokemon.name;
  setTimeout(() => {
    store.toggleFavorite(pokemon);
    flippingPokemon.value = null;
  }, 200);
};

const showAll = () => {
  showFavorites.value = false;
  currentPage.value = 1;
};

const showOnlyFavorites = () => {
  showFavorites.value = true;
  currentPage.value = 1;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>


<style scoped>
@import "@/assets/scss/bottomBar.scss";
</style>
