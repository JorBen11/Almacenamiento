import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    loading: false,
    error: null,
    pokemon: null,
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchPokemonDetailsSuccess(state, action) {
      state.pokemon = action.payload;
      state.loading = false;
    }
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, fetchPokemonDetailsSuccess } = dataSlice.actions;
export default dataSlice.reducer;
