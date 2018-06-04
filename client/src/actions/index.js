import axios from 'axios';
import {FETCH_USER, FETCH_TEAM, FETCH_PLAYER, FETCH_WORLDCUP} from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchTeam = () => async dispatch => {
    const res = await axios.get('/api/team');
    dispatch({ type: FETCH_TEAM, payload: res.data });
};

export const fetchPlayer = () => async dispatch => {
    const res = await axios.get('/api/player');
    dispatch({ type: FETCH_PLAYER, payload: res.data });
};

export const fetchWorldCup = () => async dispatch => {
    const res = await axios.get('/api/worldcup');
    dispatch({ type: FETCH_WORLDCUP, payload: res.data });
};