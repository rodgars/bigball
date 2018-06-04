import {FETCH_WORLDCUP} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_WORLDCUP:
            return _.mapKeys(action.payload[0].stages,"_id");
        default:
            return state;
    }
}