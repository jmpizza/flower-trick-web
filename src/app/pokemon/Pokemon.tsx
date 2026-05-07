import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";
import type { Pokemon } from "../../types/pokemon";

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-[#A8A77A]",
  fire: "bg-[#EE8130]",
  water: "bg-[#6390F0]",
  electric: "bg-[#F7D02C]",
  grass: "bg-[#7AC74C]",
  ice: "bg-[#96D9D6]",
  fighting: "bg-[#C22E28]",
  poison: "bg-[#A33EA1]",
  ground: "bg-[#E2BF65]",
  fly: "bg-[#A98FF3]",
  psychic: "bg-[#F95587]",
  bug: "bg-[#A6B91A]",
  rock: "bg-[#B6A136]",
  ghost: "bg-[#735797]",
  dragon: "bg-[#6F35FC]",
  dark: "bg-[#705746]",
  steel: "bg-[#B7B7CE]",
  fairy: "bg-[#D685AD]",
};

export default function PokemonData() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { name } = useParams();

  useEffect(() => {
    const loadPokemonData = async () => {
      const response = await FetchData(`pokemon/${name}`);
      setPokemon(response);
    };
    loadPokemonData();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const mainType = pokemon.types[0].type.name;
  const themeColor = TYPE_COLORS[mainType] || "bg-slate-500";

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
      <p className="text-3xl font-bold text-center capitalize mb-4 text-slate-800">
        {pokemon.name}
      </p>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-48 h-48 mx-auto mb-6"
      />

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase">Type</h3>
          <div className="flex gap-2 mt-1">
            {pokemon.types.map((type: any) => (
              <Link
                key={type.type.name}
                to={`/type/${type.type.name}`}
                className={`px-3 py-1 rounded-full text-white text-sm font-bold capitalize shadow-sm ${
                  TYPE_COLORS[type.type.name] || "bg-slate-400"
                }`}
              >
                {type.type.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase">Abilities</h3>
          <div className="flex gap-2 mt-1">
            {pokemon.abilities.map((ability: any) => (
              <Link
                key={ability.ability.name}
                to={`/ability/${ability.ability.name}`}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm capitalize font-medium text-slate-700 hover:bg-gray-200 transition-colors"
              >
                {ability.ability.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase">Height</h3>
            <div className="text-lg font-medium text-gray-700">
              {pokemon.height / 10} m
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase">Weight</h3>
            <div className="text-lg font-medium text-gray-700">
              {pokemon.weight / 10} kg
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase">Base Experience</h3>
          <div className="text-xl font-bold text-slate-800">
            {pokemon.base_experience}
          </div>
        </div>

        <div className="pt-4">
          <Link
            to={`/pokemon/${pokemon.name}/moves`}
            className={`block w-full py-3 text-center rounded-xl text-white font-bold uppercase tracking-wider shadow-md transition-transform active:scale-95 ${themeColor}`}
          >
            View Moves
          </Link>
        </div>
      </div>
    </div>
  );
}