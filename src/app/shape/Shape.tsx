import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";

export default function ShapeData() {
  const [shapeData, setShapeData] = useState<any>(null);
  const { name } = useParams();

  useEffect(() => {
    const loadShapeData = async () => {
      const response = await FetchData(`pokemon-shape/${name}`);
      setShapeData(response);
    };
    loadShapeData();
  }, [name]);

  if (!shapeData) {
    return (
      <div className="flex justify-center p-10 text-slate-400 animate-pulse">
        Loading shape details...
      </div>
    );
  }

  // Buscamos el "awesome name" en inglés para mostrarlo como subtítulo
  const awesomeName = shapeData.awesome_names.find(
    (n: any) => n.language.name === "en"
  )?.awesome_name;

return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
      <div className="mb-8 border-b pb-6 text-center">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
          Body Shape
        </h2>
        <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
          {shapeData.name.replace(/-/g, " ")}
        </h1>
        {awesomeName && (
          <p className="text-xs text-slate-400 italic mt-1">
            "{awesomeName}"
          </p>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Translations</h3>
          <div className="flex flex-wrap gap-2">
            {shapeData.names.filter((n: any) => n.language.name === "es" || n.language.name === "fr").map((n: any) => (
              <span key={n.language.name} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                <span className="font-bold uppercase text-[10px] text-gray-400 mr-1">{n.language.name}:</span>
                {n.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
            Pokemon with this shape ({shapeData.pokemon_species.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {shapeData.pokemon_species.map((species: any) => (
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
          to="/pokemon-shape" 
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Shape list
        </Link>
      </div>
    </div>
  );
}