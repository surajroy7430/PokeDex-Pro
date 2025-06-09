import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorBanner from "../components/ErrorBanner";
import Loader from "../components/Loader";

const DetailPage = () => {
  let { id } = useParams();
  let [pokemon, setPokemon] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let data = await res.json();
      setPokemon(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(pokemon)

  if (error) return <ErrorBanner error={error} />;
  if (loading) return <Loader />;

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Link to="/" className="text-stone-500">Back to Dashboard</Link>
    </div>
  );
};

export default DetailPage;
