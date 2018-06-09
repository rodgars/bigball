import {FETCH_SITUATION} from '../actions/types';

export default function(state = null, action){
    switch(action.type){
        case FETCH_SITUATION:
            return action.payload || false;
        default:
            return state;
    }
}