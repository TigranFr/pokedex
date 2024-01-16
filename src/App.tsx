import React from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { CssBaseline } from '@mui/material'
import PokemonDetailed from './components/PokemonDetailed/PokemonDetailed'

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="pokemon/:pokemonName" Component={PokemonDetailed} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
