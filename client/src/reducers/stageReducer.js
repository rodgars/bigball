import {FETCH_STAGE} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_STAGE:
            return action.payload || false;
        default:
            return state;
    }
}