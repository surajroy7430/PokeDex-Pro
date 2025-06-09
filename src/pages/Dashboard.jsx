import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../features/pokemon/pokemonThunk";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

const Dashboard = () => {
  let dispatch = useDispatch();
  let { list, loading, error, offset, type, sort } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemon({ offset, type }));
  }, [dispatch, offset, type, sort]);

  return (
    <div className="max-w-[1024px] mx-auto my-5">
      <h1 className="text-2xl font-bold text-center mb-4">Pokemon Lists</h1>
      {error && <ErrorBanner error={error} />}

      <Filters />

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`ring-1 rounded ${
                pokemon.types[0].type.name === "fire"
                  ? "ring-red-500"
                  : pokemon.types[0].type.name === "water"
                  ? "ring-blue-500"
                  : pokemon.types[0].type.name === "grass"
                  ? "ring-green-500"
                  : pokemon.types[0].type.name === "bug"
                  ? "ring-purple-500"
                  : pokemon.types[0].type.name === "ground"
                  ? "ring-amber-800"
                  : pokemon.types[0].type.name === "fighting"
                  ? "ring-amber-500"
                  : "ring-gray-500"
              }`}
            >
              <Link
                to={`/details/${pokemon.id}`}
                className={`flex gap-2 p-3 shadow-lg ${
                  pokemon.base_experience > 100 ? "bg-green-50" : ""
                }`}
              >
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className="flex flex-col gap-1 justify-between">
                  <h2 className="text-lg font-bold capitalize">
                    {pokemon.base_experience > 100
                      ? `⚡ ${pokemon.name}`
                      : pokemon.name}
                  </h2>
                  <p className="text-gray-700 capitalize">
                    <span className="font-[550]">Types: </span>
                    {pokemon.types.map((t) => t.type.name).join(", ")}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-[550]">Base Experience: </span>
                    {pokemon.base_experience}
                  </p>
                  <div className="flex gap-2 text-gray-700">
                    <p>
                      <span className="font-[550]">Height: </span>
                      {pokemon.height}"
                    </p>
                    <p>
                      <span className="font-[550]">Weight: </span>
                      {pokemon.weight}"
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Dashboard;
