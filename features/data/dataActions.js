import axios from 'axios';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure, fetchPokemonDetailsSuccess } from './dataSlice';

export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    dispatch(fetchDataSuccess(response.data.results));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export const fetchPokemonDetails = (url) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await axios.get(url);
    dispatch(fetchPokemonDetailsSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
