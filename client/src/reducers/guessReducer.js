import {FETCH_GUESS} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_GUESS:
            return action.payload[0] || false;
        default:
            return state;
    }
}