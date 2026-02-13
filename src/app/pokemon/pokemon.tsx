import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FetchData from "../../services/api";


export default function PokemonData() {
  const [pokemon, setPokemon] = useState<any[]>([])
  const { name } = useParams()

  useEffect(() => {
    const loadPokemonData = async () => {
      const response = await FetchData(`pokemon/${name}`)
      console.log(response)
      setPokemon(response)
    }
    loadPokemonData()
  }, [])

  return (
    <div>
    </div>
  );
}
