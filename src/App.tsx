import React from 'react'
import './App.css'
import MainPage from './containers/MainPage/MainPage'
import Navbar from './containers/Navbar/Navbar'

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar/>
      <MainPage/>
    </div>
  )
}

export default App
