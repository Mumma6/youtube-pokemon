import { useState } from 'react'
import { Alert, Button, CircularProgress, Grid, Paper, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import axios from 'axios'
import PokemonCard from './PokemonCard'

/*

Display more stuff for pokemon

Seperate into more components

Kolla över stylingen

*/

export interface IPokemon {
  name: string
  sprites: {
    front_shiny: string
  }
}

type Status = 'pending' | 'error' | 'success' | 'idle'

function App() {
  const [searchText, setSearchText] = useState('')
  const [pokemon, setPokemon] = useState<IPokemon | undefined>(undefined)
  const [status, setStatus] = useState<Status>('idle')

  const fetchPokemon = async (input: string | number) => {
    setStatus('pending')
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${input}`
      const { data } = await axios.get(url)
      console.log(data)
      setStatus('success')
      setPokemon(data)
    } catch (error) {
      setStatus('error')
      setPokemon(undefined)
    }
    setSearchText('')
  }

  const getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 500) + 1
    return fetchPokemon(randomId)
  }

  return (
    <>
      <Grid alignItems="center" container justifyContent="center" style={{ marginTop: 30 }}>
        <Paper style={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 40 }}>
          <h2>Pokedex</h2>
          <TextField
            onChange={(e) => setSearchText(e.target.value)}
            label="Search..."
            variant="standard"
            value={searchText}
          />
          <Button
            style={{ marginTop: 10, marginLeft: 10 }}
            variant="contained"
            disabled={!searchText}
            endIcon={<SendIcon />}
            onClick={() => fetchPokemon(searchText)}
          >
            Find
          </Button>
          <div style={{ marginTop: 20 }}>
            <Button
              disabled={status === 'pending'}
              variant="contained"
              endIcon={<ShuffleIcon />}
              onClick={() => getRandomPokemon()}
            >
              Get random
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid alignItems="center" container justifyContent="center" style={{ marginTop: 30 }}>
        {status === 'pending' && <CircularProgress />}
        <Paper elevation={2} style={{ width: 350 }}>
          {status === 'success' && pokemon && <PokemonCard pokemon={pokemon} />}
          {status === 'error' && <Alert severity="error">Pokemon not found. Try again</Alert>}
        </Paper>
      </Grid>
    </>
  )
}

export default App
