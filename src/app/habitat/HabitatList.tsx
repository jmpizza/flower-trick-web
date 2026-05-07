import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FetchData from "../../services/api.ts";

export default function HabitatList() {
  const [habitatList, setHabitatList] = useState<any[]>([]);

  useEffect(() => {
    const loadHabitat = async () => {
      const response = await FetchData(`pokemon-habitat`);
      console.log(response);
      setHabitatList(response.results);
    };
    loadHabitat();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Habitats</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {habitatList.map((habitat, index) => (
          <Link
            to={`/pokemon-habitat/${habitat.name}`}
            key={index}
            className="group border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-400 transition bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-md font-medium capitalize text-slate-800 group-hover:text-black">
                {habitat.name.replace(/-/g, " ")}
              </span>
              <span className="text-slate-300 group-hover:text-slate-500 transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
      </div>
    </div>
  );
}