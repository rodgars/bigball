import axios from 'axios';
import {FETCH_GUESS, UPDATE_GUESS, UPDATE_GLOBAL_GUESS, UPDATE_DOUBLE} from './types';

export const fetchGuess = (id) => async dispatch => {
    const res = await axios.get(`/api/guess?user=${id}`);
    dispatch({ type: FETCH_GUESS, payload: res.data });
};

export const saveGuess = (values) => async dispatch => {
    const res = await axios.put(`/api/matchGuess`, values);
    dispatch({ type: UPDATE_GUESS, payload: res.data });
};

export const saveDouble = (values) => async dispatch => {
    const res = await axios.put(`/api/stageGuess`, values);
    dispatch({ type: UPDATE_DOUBLE, payload: res.data });
};

export const saveGlobalGuess = (values) => async dispatch => {
    const res = await axios.put(`/api/globalGuess`, values);
    dispatch({ type: UPDATE_GLOBAL_GUESS, payload: res.data });
};