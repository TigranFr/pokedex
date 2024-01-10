import React from 'react';
import { useParams } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';

const PokemonDetailed = (): JSX.Element => {
    const { pokemonName } = useParams();
    const { pokemon, isLoading } = usePokemon({ pokemonName });

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>{pokemon?.name}</div>
            )}
        </div>
    );
};

export default PokemonDetailed;
