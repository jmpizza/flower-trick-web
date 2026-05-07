import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FetchData from "../../services/api.ts";

export default function TypeList() {
  const [typeList, setTypeList] = useState<any[]>([]);

  useEffect(() => {
    const loadType = async () => {
      const LIMIT = 100;
      const response = await FetchData(`type?offset=0&limit=${LIMIT}`);
      console.log(response);
      setTypeList(response.results);
    };
    loadType();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Types</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {typeList.map((type, index) => (
          <Link
            to={`/type/${type.name}`}
            key={index}
            className="group border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-400 transition bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-md font-medium capitalize text-slate-800 group-hover:text-black">
                {type.name.replace(/-/g, " ")}
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