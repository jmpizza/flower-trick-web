import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";

export default function MoveData() {
  const [move, setMove] = useState<any>();
  const { name } = useParams();

  useEffect(() => {
    const loadMoveData = async () => {
      const response = await FetchData(`move/${name}`);
      setMove(response);
    };
    loadMoveData();
  }, [name]);

  if (!move) {
    return (
      <div className="flex justify-center p-10 text-slate-400">
        Move does not exists...
      </div>
    );
  }

  const mainEffect = move.effect_entries.find(
    (e: any) => e.language.name === "en",
  );

  const alternateMainEffect = move.flavor_text_entries.find(
    (e: any) => e.language.name === "en",
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
      
      <div className="mb-8 border-b pb-6 text-center">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
          Move
        </h2>
        <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
          {move.name.replace(/-/g, " ")}
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1 uppercase">
          {move.generation.name.replace(/-/g, " ")}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Type</span>
            <span className="text-sm font-bold text-slate-700 capitalize">{move.type.name}</span>
          </div>
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Class</span>
            <span className="text-sm font-bold text-slate-700 capitalize">{move.damage_class.name}</span>
          </div>
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Power</span>
            <span className="text-sm font-bold text-slate-700">{move.power || "—"}</span>
          </div>
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">Acc</span>
            <span className="text-sm font-bold text-slate-700">{move.accuracy ? `${move.accuracy}%` : "—"}</span>
          </div>
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2">PP</span>
            <span className="text-sm font-bold text-slate-700">{move.pp}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
            Effect Description
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {mainEffect?.effect.replace(/\$effect_chance%/, move.effect_chance + "%") || alternateMainEffect.flavor_text}
          </p>
          {mainEffect?.short_effect && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <p className="text-xs text-blue-600 font-medium">
                <span className="font-bold uppercase mr-1">Summary:</span>
                {mainEffect.short_effect}
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
            Species that learn this ({move.learned_by_pokemon.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {move.learned_by_pokemon.map((p: any) => (
              <Link
                key={p.name}
                to={`/pokemon/${p.name}`}
                className="flex items-center justify-between px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg hover:border-blue-600 transition-all group shadow-sm"
              >
                <span className="capitalize font-medium text-sm">
                  {p.name.replace(/-/g, " ")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t">
        <Link
          to="/move"
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Move list
        </Link>
      </div>
    </div>
  );
}