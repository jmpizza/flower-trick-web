import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import FetchData from "../../services/api.ts";

export default function MoveList() {
  const [moveList, setMoveList] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const loadMove = async () => {
      const LIMIT = 20;
      const offset = (pageParam - 1) * LIMIT;
      const response = await FetchData(`move?offset=${offset}&limit=20`);
      console.log(response);
      setMoveList(response.results);
    };
    loadMove();
  }, [pageParam]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Moves</h2>
        <button
          className="mb-6 px-4 py-2 bg-slate-800 rounded disabled:bg-slate-300 border"
          onClick={() => setSearchParams({ page: `${pageParam - 1}` })}
          disabled={pageParam <= 1}
        >
          Previous
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {moveList.map((move, index) => (
          <Link
            to={`/move/${move.name}`}
            key={index}
            className="group border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-400 transition bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-md font-medium capitalize text-slate-800 group-hover:text-black">
                {move.name.replace(/-/g, " ")}
              </span>
              <span className="text-slate-300 group-hover:text-slate-500 transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <button
          className="mb-6 px-4 py-2 bg-slate-800 rounded disabled:bg-slate-300 border"
          onClick={() => setSearchParams({ page: `${pageParam + 1}` })}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
