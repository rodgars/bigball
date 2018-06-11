import {combineReducers} from 'redux';
import authReducer from './authReducer';
import teamReducer from './teamReducer';
import playerReduce from './playerReducer';
import guessReducer from './guessReducer';
import userReducer from './userReducer';
import stageReducer from './stageReducer';
import statusReducer from './statusReducer';
import situationReducer from './situationReducer';
import accountReducer from './accountReducer';

export default combineReducers(
    {
        auth: authReducer,
        teams: teamReducer,
        players: playerReduce,
        guess: guessReducer,
        users: userReducer,
        stages: stageReducer,
        status: statusReducer,
        situation: situationReducer,
        account: accountReducer
    }
);