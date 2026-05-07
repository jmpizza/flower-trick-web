import { useState, useEffect } from "react";

import { Link } from "react-router-dom"
import FetchData from "../../services/api.ts"

export default function Statistics() {
  const [stats, setStats] = useState({
    pokemon: 0,
    ability: 0,
    move: 0,
    type: 0,
    habitat: 0, 
    color: 0, 
    shape: 0,
  })

  useEffect(() => {
    const load = async() =>{
      const [p, a, m, t, h, c, s] = await Promise.all([
            FetchData("pokemon"),
            FetchData("ability"),
            FetchData("move"),
            FetchData("type"),
            FetchData("pokemon-habitat"),
            FetchData("pokemon-color"),
            FetchData("pokemon-shape"),
          ]);
      setStats({
        pokemon: p.count,
        ability: a.count,
        move: m.count,
        type: t.count,
        habitat: h.count,
        color: c.count,
        shape: s.count
      })
    }
    load();
  }, []);


return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-8 text-center">
        Encyclopedia Stats
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/pokemon" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-emerald-500 transition-colors">
            {stats.pokemon}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Pokémons
          </p>
        </Link>

        <Link to="/ability" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-pink-500 transition-colors">
            {stats.ability}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Abilities
          </p>
        </Link>

        <Link to="/ability" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-red-500 transition-colors">
            {stats.move}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Moves
          </p>
        </Link>

        <Link to="/type" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-purple-500 transition-colors">
            {stats.type}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Types
          </p>
        </Link>

        <Link to="/habitat" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-blue-500 transition-colors">
            {stats.habitat}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Habitats
          </p>
        </Link>

        <Link to="/color" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-amber-500 transition-colors">
            {stats.color}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Colors
          </p>
        </Link>

        <Link to="/shape" className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-200 transition-all duration-300 text-center">
          <p className="text-3xl font-black text-slate-900 group-hover:text-teal-500 transition-colors">
            {stats.shape}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
            Shapes
          </p>
        </Link>
      </div>
    </div>
  )
}