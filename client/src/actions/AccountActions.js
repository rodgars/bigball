import axios from 'axios';
import {FETCH_ACCOUNT} from './types';

export const fetchAccount = () => async dispatch => {
    const res = await axios.get('/api/account');
    dispatch({ type: FETCH_ACCOUNT, payload: res.data });
};