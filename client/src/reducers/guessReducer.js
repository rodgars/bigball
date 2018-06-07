import {FETCH_GUESS} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    if(typeof(action.payload) != 'undefined' && action.payload.length > 0) console.log("reducer",action.payload[0]);
    switch(action.type){
        case FETCH_GUESS:
            return action.payload[0] || false;
        default:
            return state;
    }
}