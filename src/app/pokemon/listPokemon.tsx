import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import FetchData from "../../services/api.ts"

export default function ListPokemon() {
  const [pokemonList, setPokemonList] = useState<any[]>([])
  const [basicData, setBasicData] = useState<any[]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1
  
  useEffect(() => {

    const loadPokemons = async () => {
      const LIMIT = 20
      const offset = (pageParam-1)*LIMIT
      const response = await FetchData(`pokemon?offset=${offset}&limit=20`)
      console.log(pageParam)
      console.log(response)
      setPokemonList(response.data.results)
    }
    loadPokemons()
  }, [pageParam])

  useEffect(() => {
    const loadBasicData = async () => {
      const requests = pokemonList.map((pokemon) => (
        FetchData(`pokemon-summary/${pokemon.name}`)
      ))
      const response = await Promise.all(requests)
      console.log(response)
      setBasicData(response)
    }
    loadBasicData()
  }, [pokemonList])

  return (
      <div>
        <button onClick={() => setSearchParams({ page: `${pageParam-1}` })}>
          Previous
        </button>
        <div>
          { basicData.map((pokemon, index) => (
            <div key={index}>
              <Link to={`/pokemon/${pokemon.data.name}`}>
                <div>
                  <img src={pokemon.data.sprites.other["official-artwork"].front_default} alt={pokemon.data.name}></img>
                </div>
                <div>
                  {pokemon.data.name}
                </div>
                <div>
                  Types: {pokemon.data.types.map((type: any) => type.type.name).join(", ")}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button onClick={() => setSearchParams({ page: `${pageParam+1}` })}>
          Next
        </button>
    </div>
  )
}
