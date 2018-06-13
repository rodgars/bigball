import {FETCH_RANKING} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_RANKING:
            return action.payload;
        default:
            return state;
    }
}