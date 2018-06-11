import {FETCH_TOPSCORER} from '../actions/types';

export default function(state = null, action){
    switch(action.type){
        case FETCH_TOPSCORER:
            return action.payload || false;
        default:
            return state;
    }
}