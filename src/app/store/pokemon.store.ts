import { defineStore } from "pinia";
import { pokemonService } from "../services/pokemon.service";
import { IPokemon, IPokemonDetails } from "../models/pokemon.model";

export const usePokemonStore = defineStore({
    id: "pokemon",
    state: () => ({
        allPokemon: [] as IPokemon[],
        favorites: [] as IPokemon[],
        selectedPokemon: null as IPokemonDetails | null
    }),
    actions: {
        async fetchAllPokemon() {
            if (this.allPokemon.length) return;
            this.allPokemon = await pokemonService.getAllPokemon();
        },

        async fetchPokemonDetails(name: string) {
            this.selectedPokemon = null;
            const data = await pokemonService.getPokemonDetails(name);
            if (data) {
                this.selectedPokemon = data;
            }
        },

        toggleFavorite(pokemon: IPokemon) {
            const index = this.favorites.findIndex(fav => fav.name === pokemon.name);
            if (index === -1) {
                this.favorites.push(pokemon);
            } else {
                this.favorites.splice(index, 1);
            }
        }
    },
    persist: {
        storage: sessionStorage,
    },
});