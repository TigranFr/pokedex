import { Box} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia/CardMedia'
import Typography from '@mui/material/Typography'
import {Link} from 'react-router-dom'
import React from 'react'
import { type ListPokemon } from '../interfaces/pokemon.interface'

interface PokemonCardProps {
  pokemon: ListPokemon
}

const PokemonCard = ({ pokemon }: PokemonCardProps): JSX.Element => {
  return (
    <Card>
      <Link to={`pokemon/${pokemon.name}`} style={{textDecoration:'none' , color:'black'}}>
        <CardMedia
          component={'img'}
          image={pokemon.image}
          title={pokemon.name}
          sx={{
            height: 100,
            objectFit: 'contain',
          }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>{pokemon.name}</Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  )
}

export default PokemonCard
