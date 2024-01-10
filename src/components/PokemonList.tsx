import { Grid } from '@mui/material';
import React from 'react';
import { type ListPokemon} from '../interfaces/pokemon.interface';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemons: ListPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps): JSX.Element => {
  return (
    <Grid container spacing={2} mt={5}>
      {pokemons.map((p) => (
        <Grid item xs={3} key={p.name}>
          <PokemonCard pokemon={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;
