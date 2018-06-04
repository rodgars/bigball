import {FETCH_TEAM} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_TEAM:
            return _.orderBy(_.map(action.payload, (obj) => {
                return {"name":obj.name,"flag":`flag-24 flag-${obj._id}`,"id":obj._id}
            }),['name'],['ASC']);
        default:
            return state;
    }
}