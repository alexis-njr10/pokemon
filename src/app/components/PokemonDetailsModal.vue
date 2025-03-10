<template>
    <div v-show="isOpen" class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="close">
                <img src="@/assets/img/closed.svg" alt="Close" />
            </button>

            <div class="pokemon-image-container" v-if="pokemonDetails">
                <img 
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`"
                    alt="Pokemon Image" 
                    class="pokemon-image" 
                />
            </div>

            <div class="info-container" v-if="pokemonDetails">
                <p class="pokemon-detail">
                    <strong>Name:</strong> {{ pokemonDetails.name }}
                </p>
                <p class="pokemon-detail">
                    <strong>Weight:</strong> {{ pokemonDetails.weight }}
                </p>
                <p class="pokemon-detail">
                    <strong>Height:</strong> {{ pokemonDetails.height }}
                </p>
                <p class="pokemon-detail">
                    <strong>Type:</strong> {{ pokemonDetails.types.join(', ') }}
                </p>
            </div>

            <div class="modal-footer" v-if="pokemonDetails">
                <button class="share-btn" @click="sharePokemon">
                    Share to my friends
                </button>
                <button class="favorite-btn" @click="toggleFavorite">
                    <img :src="getStarImage" alt="Favorite" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { usePokemonStore } from '@/app/store/pokemon.store';

const props = defineProps({
    pokemon: Object,
    isOpen: Boolean
});

const emit = defineEmits(['close']);
const store = usePokemonStore();

const pokemonDetails = computed(() => store.selectedPokemon);

watch(() => props.pokemon, async (newPokemon) => {
    if (newPokemon) {
        await store.fetchPokemonDetails(newPokemon.name);
    }
}, { immediate: true });

const sharePokemon = async () => {
    if (!pokemonDetails.value) return;

    const { name, weight, height, types } = pokemonDetails.value;

    const textToCopy = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${types.join(', ')}`;

    try {
        await navigator.clipboard.writeText(textToCopy);
        alert('Pokemon data copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy!', err);
    }
};

const isFavorite = computed(() =>
    store.favorites.some(p => p.name === props.pokemon?.name)
);

const getStarImage = computed(() =>
    isFavorite.value
        ? new URL('@/assets/img/Star.svg', import.meta.url).href
        : new URL('@/assets/img/OffStar.svg', import.meta.url).href
);

const toggleFavorite = () => {
    if (props.pokemon) {
        store.toggleFavorite(props.pokemon);
    }
};

const close = () => {
    emit("close");
};
</script>

<style scoped>
@import "@/assets/scss/modal.scss";
</style>
