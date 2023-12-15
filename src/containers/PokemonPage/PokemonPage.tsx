import React, { useEffect } from 'react';
import { getPokemon } from '../../data/AsyncThunks';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface PokemonPageProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonPage = ({ pokemon }: PokemonPageProps): JSX.Element => {

  const fetchedPokemon = useAppSelector(state => state.pokemon.pokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getPokemon(pokemon.name));
  }, [dispatch , pokemon.name]);

  return (
    <div>
     {fetchedPokemon?.name}
     {fetchedPokemon?.weight}
     {fetchedPokemon?.height}
    </div>
  );
};

export default PokemonPage;
