import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "../features/pokemon/pokemonSlice";

const Pagination = () => {
  let dispatch = useDispatch();
  let { offset, count } = useSelector((state) => state.pokemon);
  let limit = 20;

  return (
    <div className="mt-4 flex items-center gap-2 justify-center">
      <button
        onClick={() => dispatch(setOffset(Math.max(0, offset - limit)))}
        disabled={offset === 0}
        className="bg-sky-400 py-1 px-3 rounded hover:bg-sky-500"
      >
        Prev
      </button>
      <span className="text-sm text-gray-400">
        Page {Math.floor(offset / limit) + 1}
      </span>
      <button
        onClick={() => dispatch(setOffset(offset + limit))}
        disabled={offset + limit >= count}
        className="bg-sky-400 py-1 px-3 rounded hover:bg-sky-500"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
