import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";
import type { Pokemon } from "../../types/pokemon";

export default function PokemonMove() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { name } = useParams();

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const response = await FetchData(`pokemon/${name}`);
        setPokemon(response);
      } catch (error) {
        console.error("Failed to load moves:", error);
      }
    };
    if (name) loadPokemonData();
  }, [name]);

  if (!pokemon) {
    return (
      <div className="flex justify-center p-10 text-slate-400">
        Loading moves...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
      
      {/* Header Section */}
      <div className="mb-8 border-b pb-6 text-center">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
          Move Set
        </h2>
        <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
          {pokemon.name.replace(/-/g, " ")}
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1 uppercase">
          Total Moves: {pokemon.moves.length}
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
            Learned Moves
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {pokemon.moves.map((m: any) => (
              <Link
                key={m.move.name}
                to={`/move/${m.move.name}`}
                className="group flex flex-col px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-600 hover:bg-white transition-all shadow-sm"
              >
                <span className="capitalize text-blue-500 font-semibold text-sm">
                  {m.move.name.replace(/-/g, " ")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t">
        <Link 
          to={`/pokemon/${name}`} 
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Back to {pokemon.name}
        </Link>
      </div>
    </div>
  );
}