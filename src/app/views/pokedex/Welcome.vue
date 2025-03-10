<template>
  <div class="flex-center">
    <img src="@/assets/img/pikachu.svg" alt="Pikachu" class="pikachu-img">
    <h1 class="text-title">Welcome to Pokédex</h1>
    <p class="text-description">
      The digital encyclopedia created by Professor Oak is an invaluable tool
      to Trainers in the Pokémon world.
    </p>
    <router-link to="/pokedex/list" class="mt-6">
      <button class="stard-btn">
        Get Started
      </button>
    </router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
@import "@/assets/scss/welcome.scss";
</style>