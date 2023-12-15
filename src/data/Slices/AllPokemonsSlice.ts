import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { type NameURL } from "../../types/interfaces";
import { getAllPokemons } from "../AsyncThunks";

interface IPokemonsState {
  pokemons: NameURL[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IPokemonsState = {
  pokemons: [],
  isLoading: false,
  error: null,
};

const allPokemons = createSlice({
  name: "allPokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPokemons.fulfilled, (state, action:PayloadAction<NameURL[]>) => {
        state.isLoading = false;
        state.pokemons = action.payload;
        state.error = null;
      })
      .addCase(getAllPokemons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default allPokemons.reducer;
