import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, setType } from "../features/pokemon/pokemonSlice";

const Filters = () => {
  let dispatch = useDispatch();
  let { type, sort } = useSelector((state) => state.pokemon);
  let [types, setTypes] = useState([]);

  useEffect(() => {
    let fetchTypes = async () => {
      try {
        let res = await fetch(`https://pokeapi.co/api/v2/type`);
        let data = await res.json();
        setTypes(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTypes();
  }, []);
  return (
    <div className="mb-4 flex gap-4">
      <select
        value={type}
        onChange={(e) => dispatch(setType(e.target.value))}
        className="border rounded p-2 capitalize"
      >
        <option value="all">All Types</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        className="border rounded p-2"
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
};

export default Filters;
