import axios from "axios";
import { useEffect, useState } from "react";
import { POKEMON_API_POKEMON_URL } from "../constants";
import {type IPokemon } from "../interfaces/exactPokemon.interface";

interface UsePokemonProps{
    pokemonName: string | undefined;
}

interface UsePokemonReturningValues{
    pokemon:IPokemon | null,
    isLoading:boolean
}


const usePokemon = ({pokemonName}:UsePokemonProps):UsePokemonReturningValues => {
    const [pokemon , setPokemon] = useState<IPokemon | null>(null);
    const [isLoading , setIsLoading] = useState<boolean>(false);
    
    useEffect(()=>{
        if(pokemonName != null){
            void fetchPokemon();
        }
    },[pokemonName])
    

    const fetchPokemon = async () :Promise<void> => {
        if(pokemonName != null){
            setIsLoading(true);
            const url = `${POKEMON_API_POKEMON_URL}/${pokemonName}`;
            const result = await axios.get<IPokemon>(url);
            setPokemon(result.data);
            setIsLoading(false);
        }
    }
    
    return{
        pokemon,
        isLoading
    }
}

export default usePokemon;