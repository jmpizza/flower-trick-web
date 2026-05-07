import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FetchData from "../../services/api";

export default function TypeData() {
  const [type, setType] = useState<any>(null);
  const { name } = useParams();

  useEffect(() => {
    const loadTypeData = async () => {
      const response = await FetchData(`type/${name}`);
      setType(response);
    };
    loadTypeData();
  }, [name]);

  if (!type) {
    return (
      <div className="flex justify-center p-10 text-slate-400">
        Not found...
      </div>
    )
  }

return (
  <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">

    <div className="mb-8 border-b pb-6 text-center">
      <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
        Pokémon Type
      </h2>
      <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
        {type.name}
      </h1>
      <p className="text-xs text-slate-400 font-mono mt-1 uppercase">
        Introduced in {type.generation.name.replace("-", " ")}
      </p>
    </div>

    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
          Damage Relations
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b pb-1">As Attacker</h4>
            <DamageGroup title="Double damage to" types={type.damage_relations.double_damage_to} color="text-green-600" />
            <DamageGroup title="Half damage to" types={type.damage_relations.half_damage_to} color="text-orange-600" />
            <DamageGroup title="No damage to" types={type.damage_relations.no_damage_to} color="text-red-600" />
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b pb-1">As Defender</h4>
            <DamageGroup title="Double damage from" types={type.damage_relations.double_damage_from} color="text-red-600" />
            <DamageGroup title="Half damage from" types={type.damage_relations.half_damage_from} color="text-green-600" />
            <DamageGroup title="No damage from" types={type.damage_relations.no_damage_from} color="text-blue-600" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
          Species with this type ({type.pokemon.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {type.pokemon.map((p: any) => (
            <Link
              key={p.pokemon.name}
              to={`/pokemon/${p.pokemon.name}`}
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-center capitalize text-slate-700 font-medium hover:border-blue-600 transition-all shadow-sm text-sm"
            >
              {p.pokemon.name.replace(/-/g, " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-10 pt-6 border-t">
      <Link 
        to="/type" 
        className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
      >
        ← Type list
      </Link>
    </div>
  </div>
);
}

function DamageGroup({ title, types, color }: { title: string, types: any[], color: string }) {
  if (types.length === 0) return null;
  return (
    <div className="mb-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{title}</p>
      <div className="flex flex-wrap gap-1">
        {types.map((t) => (
          <span key={t.name} className={`px-2 py-1 rounded-md bg-slate-50 text-xs font-bold capitalize ${color}`}>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}
