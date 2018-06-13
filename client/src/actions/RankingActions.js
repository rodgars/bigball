import axios from 'axios';
import {FETCH_RANKING} from './types';

export const fetchRanking = () => async dispatch => {
    const res = await axios.get('/api/ranking');
    dispatch({ type: FETCH_RANKING, payload: res.data });
};