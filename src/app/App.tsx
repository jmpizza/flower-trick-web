import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import "./index.css";

import ListPokemon from "./pokemon/PokemonList.tsx";
import ListAbility from "./ability/ListAbility.tsx";
import ListType from "./type/TypeList.tsx";
import ListHabitat from "./habitat/HabitatList.tsx";
import ListShape from "./shape/ShapeList.tsx";
import ListColor from "./color/ColorList.tsx";
import ListMove from "./move/MoveList.tsx";

import PokemonData from "./pokemon/Pokemon.tsx";
import AbilityData from "./ability/Ability.tsx";
import MoveData from "./move/Move.tsx";
import TypeData from "./type/Type.tsx";
import HabitatData from "./habitat/Habitat.tsx";
import ShapeData from "./shape/Shape.tsx";
import ColorData from "./color/Color.tsx";
import Statistics from "./statistics/Statistics.tsx";
import FetchData from "../services/api.ts";

import PokemonMoves from "./pokemon/PokemonMoves.tsx";

export default function App() {

  return (
    <div className="min-h-screen w-screen">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/pokemon" element={<ListPokemon />}></Route>
        <Route path="/pokemon/:name" element={<PokemonData />}></Route>
        <Route path="/ability" element={<ListAbility/>}></Route>
        <Route path="/ability/:name" element={<AbilityData/>}></Route>
        <Route path="/move" element={<ListMove/>}></Route>
        <Route path="/move/:name" element={<MoveData/>}></Route>
        <Route path="/type" element={<ListType/>}></Route>
        <Route path="/type/:name" element={<TypeData/>}></Route>
        <Route path="/pokemon-habitat" element={<ListHabitat/>}></Route>
        <Route path="/pokemon-habitat/:name" element={<HabitatData/>}></Route>
        <Route path="/pokemon-shape" element={<ListShape/>}></Route>
        <Route path="/pokemon-shape/:name" element={<ShapeData/>}></Route>
        <Route path="/pokemon-color" element={<ListColor/>}></Route>
        <Route path="/pokemon-color/:name" element={<ColorData/>}></Route>
        <Route path="/pokemon/:name/move" element={<PokemonMoves/>}></Route>
      </Routes>
    </div>
  );
}

function Main() {
  const [meowscarada, setMeowscarada] = useState<any>();

  useEffect(() => {
    const load = async () => {
      const response = await FetchData(`pokemon/meowscarada`);
      setMeowscarada(response);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        
        <div className="text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-2">
            Poké<span className="text-slate-400">Encyclopedia</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Explore the world of Pokémon with real-time data.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Global Insights
            </h2>
            <Statistics />
            <Link 
              to="/pokemon" 
              className="block w-full py-4 bg-slate-200 hover:bg-slate-300 text-white text-center rounded-2xl font-bold transition-all shadow-lg shadow-slate-200"
            >
              Browse All Pokémon →
            </Link>
          </div>

          <div className="max-w-md w-full bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow mx-auto">
            <div className="bg-emerald-500 p-4">
              <h2 className="text-white text-xs font-black uppercase tracking-widest text-center">
                Featured Pokémon
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full scale-110 blur-xl opacity-50"></div>
                  <img
                    src={meowscarada?.sprites.other["official-artwork"].front_default}
                    alt="Meowscarada"
                    className="relative w-40 h-40 object-contain"
                  />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-800 capitalize mb-1">
                  {meowscarada?.name}
                </h3>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full">
                    Grass
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-full">
                    Dark
                  </span>
                </div>
                <Link
                  to={`/pokemon/meowscarada`}
                  className="w-full py-3 bg-green-100 hover:bg-emerald-200 text-center text-sm font-bold uppercase tracking-tighter rounded-xl transition-colors shadow-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}