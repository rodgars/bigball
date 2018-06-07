import axios from 'axios';
import {FETCH_TEAM} from './types';

export const fetchTeam = () => async dispatch => {
    const res = await axios.get('/api/team');
    dispatch({ type: FETCH_TEAM, payload: res.data });
};