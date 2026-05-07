import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";

export default function AbilityData() {
  const [ability, setAbility] = useState<any>();
  const { name } = useParams();

  useEffect(() => {
    const loadAbilityData = async () => {
      const response = await FetchData(`ability/${name}`);
      setAbility(response);
    };
    loadAbilityData();
  }, [name]);

  if (!ability) {
    return (
      <div className="flex justify-center p-10 text-slate-400">
        Ability does not exists...
      </div>
    );
  }

  const mainEffect = ability.effect_entries.find(
    (e: any) => e.language.name === "en",
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
      
      <div className="mb-8 border-b pb-6 text-center">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
          Ability
        </h2>
        <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
          {ability.name.replace(/-/g, " ")}
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1 uppercase">
          {ability.generation.name.replace(/-/g, " ")}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
            Effect Description
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {mainEffect?.effect || "No description available."}
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
            Species with this ability ({ability.pokemon.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {ability.pokemon.map((p: any) => (
              <Link
                key={p.pokemon.name}
                to={`/pokemon/${p.pokemon.name}`}
                className="flex items-center justify-between px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg hover:border-blue-600 transition-all group shadow-sm"
              >
                <span className="capitalize font-medium text-sm">
                  {p.pokemon.name.replace(/-/g, " ")}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    p.is_hidden
                      ? "bg-purple-100 text-purple-600 border-purple-200 group-hover:bg-purple-400 group-hover:text-white group-hover:border-purple-300"
                      : "bg-green-100 text-green-600 border-green-200 group-hover:bg-green-400 group-hover:text-white group-hover:border-green-300"
                  }`}
                >
                  {p.is_hidden ? "H" : "N"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t">
        <Link
          to="/ability"
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Ability list
        </Link>
      </div>
    </div>
  );
}
