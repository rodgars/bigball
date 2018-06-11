import axios from 'axios';
import {FETCH_USER_LIST, UPDATE_USER, FETCH_STAGE, UPDATE_STAGE, FETCH_SITUATION, FETCH_STATUS, UPDATE_MATCH, FETCH_TOPSCORER, UPDATE_TOPSCORER} from './types';

export const fetchUserList = (query) => async dispatch => {
    const res = await axios.get(`/api/user${query}`);
    dispatch({ type: FETCH_USER_LIST, payload: res.data });
};

export const saveUser = (id, values) => async dispatch => {
    const res = await axios.put(`/api/user/${id}`, values);
    dispatch({ type: UPDATE_USER, payload: res.data });
};

export const fetchStages = () => async dispatch => {
    const res = await axios.get(`/api/stage`);
    dispatch({ type: FETCH_STAGE, payload: res.data });
};

export const saveStages = (values) => async dispatch => {
    const res = await axios.put(`/api/stage`, values);
    dispatch({ type: UPDATE_STAGE, payload: res.data });
};

export const saveMatch = (values) => async dispatch => {
    const res = await axios.put(`/api/match`, values);
    dispatch({ type: UPDATE_MATCH, payload: res.data });
};

export const fetchSituation = () => async dispatch => {
    const res = await axios.get(`/api/stage/situation`);
    dispatch({ type: FETCH_SITUATION, payload: res.data });
};

export const fetchStatus = () => async dispatch => {
    const res = await axios.get(`/api/stage/status`);
    dispatch({ type: FETCH_STATUS, payload: res.data });
};

export const fetchTopScorer = () => async dispatch => {
    const res = await axios.get(`/api/topScorer`);
    dispatch({ type: FETCH_TOPSCORER, payload: res.data });
};

export const saveTopScorer = (values) => async dispatch => {
    const res = await axios.put(`/api/topScorer`, values);
    dispatch({ type: UPDATE_TOPSCORER, payload: res.data });
};