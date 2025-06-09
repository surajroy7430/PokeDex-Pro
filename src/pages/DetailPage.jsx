import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorBanner from "../components/ErrorBanner";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const DetailPage = () => {
  let { id } = useParams();
  let list = useSelector((state) => state.pokemon.list);

  let [pokemon, setPokemon] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");

      let data = await res.json();
      setPokemon(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = list.find((p) => p.id === id);
    if (data) {
      setPokemon(data);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [id, list]);

  if (error) return <ErrorBanner error={error} />;
  if (loading) return <Loader />;
  if (!pokemon) return <p>Not Found</p>;

  return (
    <div className="max-w-2xl mx-auto my-5">
      <Link to="/" className="bg-stone-200 rounded p-2">
        Back to Dashboard
      </Link>

      <div className="mt-4 text-center w-full p-2">
        <h2 className="text-3xl capitalize font-bold mb-3">
          {pokemon.base_experience > 100 ? `⚡ ${pokemon.name}` : pokemon.name}
          <span className="text-zinc-400"> #{pokemon.id}</span>
        </h2>
        <div className="flex gap-2">
          <div className="w-[400px] flex flex-col gap-3 justify-between">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className={`w-full rounded-lg ${
                pokemon.base_experience > 100 ? "bg-green-100" : "bg-gray-50"
              }`}
            />
            <div className="grid grid-cols-2 gap-2">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="border rounded"
              />
              <img
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                className="border rounded"
              />
              <img
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                className="border rounded"
              />
              <img
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                className="border rounded"
              />
            </div>
          </div>

          <div className="content text-justify p-3 flex flex-col gap-4">
            <div className="h-[200px]">
              <h3>
                <span className="text-lg font-semibold">Height: </span>
                {pokemon.height}"
              </h3>
              <h3>
                <span className="text-lg font-semibold">Weight: </span>
                {pokemon.weight}"
              </h3>
              <h3 className="capitalize">
                <span className="text-lg font-semibold">Abilities: </span>
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </h3>
              <h3 className="capitalize">
                <span className="text-lg font-semibold">Types: </span>
                <span
                  className={`${
                    pokemon.types[0].type.name === "fire"
                      ? "text-red-500"
                      : pokemon.types[0].type.name === "water"
                      ? "text-blue-500"
                      : pokemon.types[0].type.name === "grass"
                      ? "text-green-500"
                      : pokemon.types[0].type.name === "bug"
                      ? "text-purple-500"
                      : pokemon.types[0].type.name === "ground"
                      ? "text-amber-800"
                      : pokemon.types[0].type.name === "fighting"
                      ? "text-amber-500"
                      : "text-gray-500"
                  }`}
                >
                  {pokemon.types.map((a) => a.type.name).join(", ")}
                </span>
              </h3>
            </div>

            <h3 className="capitalize">
              <span className="text-lg font-semibold">Stats: </span>
              {pokemon.stats.map((a) => a.stat.name).join(", ")}
            </h3>
            <h3 className="capitalize">
              <span className="text-lg font-semibold">Moves: </span>
              {pokemon.moves
                .map((a) => a.move.name)
                .slice(0, 10)
                .join(", ")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
