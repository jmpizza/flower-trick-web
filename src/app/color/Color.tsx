import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";

export default function ColorData() {
  const [colorData, setColorData] = useState<any>();
  const { name } = useParams();

  useEffect(() => {
    const loadColorData = async () => {
      const response = await FetchData(`pokemon-color/${name}`);
      setColorData(response);
    };
    loadColorData();
  }, [name]);

  if (!colorData) {
    return (
      <div className="flex justify-center p-10 italic text-gray-400">
        Loading color group...
      </div>
    );
  }

  const bgColors: { [key: string]: string } = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    black: "bg-gray-800",
    brown: "bg-amber-800",
    gray: "bg-gray-400",
    pink: "bg-pink-400",
    purple: "bg-purple-500",
    white: "bg-slate-100 border-2 border-gray-200",
  };

return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">

      <div className="mb-8 border-b pb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full shadow-md ${bgColors[colorData.name] || 'bg-gray-200'}`}></div>
        </div>
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
          Color Group
        </h2>
        <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
          {colorData.name}
        </h1>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Translations</h3>
          <div className="flex flex-wrap gap-2">
            {colorData.names.filter((n: any) => n.language.name === "es" || n.language.name === "fr").map((n: any) => (
              <span key={n.language.name} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                <span className="font-bold uppercase text-[10px] text-gray-400 mr-1">{n.language.name}:</span>
                {n.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
            Species in this category ({colorData.pokemon_species.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {colorData.pokemon_species.map((species: any) => (
              <Link
                key={species.name}
                to={`/pokemon/${species.name}`}
                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-center capitalize text-slate-700 font-medium hover:border-blue-600 transition-all shadow-sm"
              >
                {species.name.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t">
        <Link 
          to="/pokemon-color" 
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Color list
        </Link>
      </div>
    </div>
  );
}