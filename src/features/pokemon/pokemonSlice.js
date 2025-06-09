import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemon } from "./pokemonThunk";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    count: 0,
    loading: false,
    error: null,
    offset: 0,
    type: "all",
    sort: "asc",
  },

  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
      state.offset = 0;
    },
    setSort: (state, action) => {
      state.sort(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        let sortedList = [...action.payload.results].sort((a, b) => {
          return state.sort === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });

        state.list = sortedList;
        state.count = action.payload.count;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload;
      });
  },
});

export const { setOffset, setType, setSort } = pokemonSlice.actions;
export default pokemonSlice.reducer;
