import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import FetchData from "../../services/api.ts"

export default function PokemonList() {
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
      setPokemonList(response.results)
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
    <div className="max-w-6xl mx-auto p-8">
      <button 
        className="mb-6 px-4 py-2 bg-slate-800 rounded disabled:bg-slate-300 border"
        onClick={() => setSearchParams({ page: `${pageParam-1}` })}
        disabled={pageParam <= 1}
      >
        Previous
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        { basicData.map((pokemon, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <Link to={`/pokemon/${pokemon.name}`}>
              <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center mb-3">
                <img 
                  src={pokemon.sprites.other["official-artwork"].front_default} 
                  alt={pokemon.name}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
              <div className="text-xl font-bold capitalize text-slate-900">
                {pokemon.name}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Types: {pokemon.types.map((type: any) => type.type.name).join(", ")}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button 
        className="mt-8 px-4 py-2 bg-slate-800 rounded border"
        onClick={() => setSearchParams({ page: `${pageParam+1}` })}
      >
        Next
      </button>
    </div>
  )
}
