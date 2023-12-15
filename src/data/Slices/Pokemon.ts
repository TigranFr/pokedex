import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IPokemon } from "../../types/interfaces";
import { getPokemon } from "../AsyncThunks";

interface IPokemonState {
    pokemon: IPokemon | null,
    isLoading: boolean , 
    error: string | null
}

const initialState : IPokemonState = {
    pokemon: null,
    isLoading: false,
    error: null
}


const pokemon = createSlice({
    name:'pokemon',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getPokemon.pending , (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPokemon.fulfilled , (state,action:PayloadAction<IPokemon>) => {
                state.isLoading = false;
                state.error = null;
                state.pokemon = action.payload
            })
            .addCase(getPokemon.rejected , (state , action) => {
                state.isLoading = false;
                state.error = action.payload as string | null
            })
    }
})

export default pokemon.reducer;