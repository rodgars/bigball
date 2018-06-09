import axios from 'axios';
import {FETCH_USER_LIST, UPDATE_USER} from './types';

export const fetchUserList = (query) => async dispatch => {
    const res = await axios.get(`/api/user${query}`);
    dispatch({ type: FETCH_USER_LIST, payload: res.data });
};

export const saveUser = (id, values) => async dispatch => {
    const res = await axios.put(`/api/user/${id}`, values);
    dispatch({ type: UPDATE_USER, payload: res.data });
};