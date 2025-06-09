import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async ({ offset, type }, thunkAPI) => {
    try {
      let results = [];

      if (type && type !== "all") {
        let res = await fetch(`${BASE_URL}/type/${type}`);
        if (!res.ok) throw new Error("Failed to fetch type data");

        let data = await res.json();
        results = data.pokemon.map((p) => p.pokemon);

        results = results.slice(offset, offset + 20);
      } else {
        let res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=20`);
        if (!res.ok) throw new Error("Failed to fetch pokemons");

        let data = await res.json();
        results = data.results;
      }

      const detailedResults = await Promise.all(
        results.map(async (pokemon) => {
          let res = await fetch(pokemon.url);
          if (!res.ok) throw new Error("Failed to fetch pokemon data");
          return await res.json();
        })
      );

      let filteredResults = detailedResults.filter(Boolean);

      return {
        results: filteredResults,
        count: type && type !== "all" ? results.length : 1302,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
