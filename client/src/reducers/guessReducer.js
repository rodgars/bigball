import {FETCH_GUESS} from '../actions/types';
import _ from 'lodash';

export default function(state = null, action){
    switch(action.type){
        case FETCH_GUESS:
            let guess = action.payload[0];
            guess.stageGuesses = _.orderBy(guess.stageGuesses,["order"],["desc"]);
            for(let i=0; i< guess.stageGuesses.length; i++){
                guess.stageGuesses[i].matchGuesses = _.orderBy(guess.stageGuesses[i].matchGuesses,["date"],["asc"]);
            }
            return guess;
        default:
            return state;
    }
}