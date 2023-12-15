import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import allPokemonReducer from '../data/Slices/AllPokemonsSlice';
import pokemonReducer from '../data/Slices/Pokemon';

const reducers = combineReducers({
    allPokemons : allPokemonReducer,
    pokemon :  pokemonReducer
})

const store = configureStore({
    reducer:reducers
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;