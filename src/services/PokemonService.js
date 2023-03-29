import { logger } from "../utils/Logger.js";
import { pokeApi } from "./AxiosService.js";
import { AppState } from "../AppState.js";
import { Pokemon } from "../models/Pokemon.js";

class PokemonService {
  async getAllPokemon() {
    const res = await pokeApi.get('')
    logger.log('[GETTING ALL POKEMON]', res.data)
    AppState.pokemons = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }

  async setActivePokemon(url) {
    const res = await pokeApi.get(url)
    logger.log('[SETTING ACTIVE POKEMON]', res.data)
    AppState.activePokemon = new Pokemon(res.data)
  }

  async changePage(url) {
    const res = await pokeApi.get(url)
    logger.log('[CHANGING PAGE]', res.data)
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
    AppState.pokemons = res.data.results
  }
}

export const pokemonService = new PokemonService();