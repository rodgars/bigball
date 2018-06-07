import {FETCH_PLAYER} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_PLAYER:
            return _.orderBy(_.map(action.payload, (obj) => {
                return {"id":obj._id,"name":obj.name,"team":obj.team._id,"flag":`flag-24 flag-${obj.team._id}`}
            }),["name"],["ASC"]);
            //return action.payload || false;
        default:
            return state;
    }
}