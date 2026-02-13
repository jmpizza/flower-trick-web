import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import "./index.css";
import FetchData from "../services/api.ts"
import ListPokemon from "./pokemon/listPokemon.tsx";
import PokemonData from "./pokemon/pokemon.tsx";

export default function App() {

  return (
    <div className="min-h-screen w-screen">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/pokemon" element={<ListPokemon />}></Route>
        <Route path="/pokemon/:name" element={<PokemonData />}></Route>
      </Routes>
    </div>
  );
}

function Main() {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">
          Main Page of pokeapi test
        </h1>
        <Statistics/>
      </div>
      
    </main>
  );
}

function Statistics() {
  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    const load = async () => {
      const response = await FetchData("pokemon")
      console.log(response.data)
      setPokemon(response.data.count)
    }
    load()
  }, []);


  return (
    <div>
      <Link to="/pokemon" className="my-2 text-gray-700">
        <p>
          { pokemon }
        </p>
        <p>
          Pokemons
        </p>
      </Link>
    </div>
  )
}
