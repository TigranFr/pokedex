import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type IPokemon, type NameURL } from "../types/interfaces";

const fetchAllPokemons = async (): Promise<NameURL[]> => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1292');
    const data = response.data.results;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch all Pokemons");
  }
};

export const getAllPokemons = createAsyncThunk<NameURL[]>(
  'allPokemons',
  async () => {
    try {
      const response = await fetchAllPokemons();
      return response;
    } catch (error) {
      throw new Error("Failed to get all Pokemons");
    }
  }
);

const fetchPokemon = async (name:string): Promise<IPokemon> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch pokemon");
  }
};

export const getPokemon = createAsyncThunk<IPokemon, string>(
  'pokemon',
  async (pokemonName) => {
    try {
      const response = await fetchPokemon(pokemonName);
      return response;
    } catch (error) {
      throw new Error("Failed to get Pokemon");
    }
  }
);
