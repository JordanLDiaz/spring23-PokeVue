<template>
  <div class="row">
    <!-- SECTION Pokemon list and buttons -->
    <div class="col-md-4 text-center">
      <div class="row">
        <div class="col-md-6">
          <button @click="changePage(previousPage)" class="btn btn-outline-light w-50">Previous</button>
        </div>
        <div class="col-md-6">
          <button @click="changePage(nextPage)" class="btn btn-outline-light w-50">Next</button>
        </div>
      </div>
      <div class="row">
        <div v-for="p in pokemons">
          <button @click="setActivePokemon(p.url)" class="btn btn-danger w-75 m-1">{{ p.name }}</button>
        </div>
      </div>
    </div>

    <!-- SECTION Active Pokemon -->
    <div v-if="activePokemon" class="col-md-8 d-flex justify-content-center text-center">
      <div class="poke-card rounded m-2 p-2">
        <img :src="activePokemon.img" :alt="activePokemon.name" :title="activePokemon.name" class="img-fluid pokeImg">
        <h1>{{ activePokemon.name }}</h1>
        <p>Height: {{ activePokemon.height }} | Weight: {{ activePokemon.weight }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { pokemonService } from "../services/PokemonService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    async function getAllPokemon() {
      try {
        await pokemonService.getAllPokemon()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getAllPokemon();
    })

    return {
      pokemons: computed(() => AppState.pokemons),
      activePokemon: computed(() => AppState.activePokemon),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async setActivePokemon(url) {
        try {
          await pokemonService.setActivePokemon(url)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async changePage(url) {
        try {
          await pokemonService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn-danger {
  background-color: rgba(255, 0, 0, 0.374);
}

.pokeImg {
  height: 20em;
  width: 20em;
}

.poke-card {
  background-color: rgba(255, 0, 0, 0.374);
  width: 30rem;
  height: 30rem;
  color: whitesmoke;
}
</style>
