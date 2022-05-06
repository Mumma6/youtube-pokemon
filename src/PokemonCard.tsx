import { IPokemon } from './App'

const PokemonCard = ({ pokemon }: { pokemon: IPokemon }) => {
  return (
    <div>
      <img width={350} src={pokemon.sprites.front_shiny} loading="lazy" alt="pokemon" />
      <h4>{pokemon.name}</h4>
    </div>
  )
}

export default PokemonCard
