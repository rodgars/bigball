import axios from 'axios';
import {FETCH_GUESS, UPDATE_GUESS} from './types';

export const fetchGuess = (id) => async dispatch => {
    console.log("url",`/api/guess/${id}`);
    const res = await axios.get(`/api/guess/${id}`);
    dispatch({ type: FETCH_GUESS, payload: res.data });
};