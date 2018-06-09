import {FETCH_USER_LIST, UPDATE_USER} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_USER_LIST:
            return _.mapKeys(action.payload,"userId");
        // case UPDATE_USER:
        //     return { ...state, [action.payload.userId]: action.payload };
        default:
            return state;
    }
}