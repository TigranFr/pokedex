import axios from "axios";
import { useEffect, useState } from "react";
import { POKEMON_API_POKEMON_URL } from "../constants";
import {type IPokemon } from "../interfaces/exactPokemon.interface";

interface UsePokemonByIdProps{
    previousPokemonID: number | null;
    nextPokemonID : number | null;
}

interface UsePokemonReturningValues{
    previousPokemonById:IPokemon | null,
    nextPokemonById:IPokemon | null
}


const usePokemonById = ({previousPokemonID , nextPokemonID}:UsePokemonByIdProps):UsePokemonReturningValues => {
    const [previousPokemonById , setPrevPokemon] = useState<IPokemon | null>(null);
    const [nextPokemonById , setNextPokemon] = useState<IPokemon | null>(null);

    useEffect(()=>{
        if(previousPokemonID != null || nextPokemonID != null){
            void fetchPokemons();
        }
    },[previousPokemonID , nextPokemonID])
    

    const fetchPokemons = async () :Promise<void> => {
        if(previousPokemonID != null){
            const url = `${POKEMON_API_POKEMON_URL}/${previousPokemonID}`;
            const result = await axios.get<IPokemon>(url);
            setPrevPokemon(result.data);
        }
        if(nextPokemonID != null){
            const url = `${POKEMON_API_POKEMON_URL}/${nextPokemonID}`;
            const result = await axios.get<IPokemon>(url);
            setNextPokemon(result.data);
        }
    }
    
    return{
        previousPokemonById,
        nextPokemonById
    }
}

export default usePokemonById;