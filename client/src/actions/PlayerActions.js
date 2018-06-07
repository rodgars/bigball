import axios from 'axios';
import {FETCH_PLAYER} from './types';

export const fetchPlayer = () => async dispatch => {
    const res = await axios.get('/api/player');
    dispatch({ type: FETCH_PLAYER, payload: res.data });
};