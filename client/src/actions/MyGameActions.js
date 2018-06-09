import axios from 'axios';
import {FETCH_GUESS, UPDATE_GUESS} from './types';

export const fetchGuess = (id) => async dispatch => {
    const res = await axios.get(`/api/guess/${id}`);
    dispatch({ type: FETCH_GUESS, payload: res.data });
};