import {combineReducers} from 'redux';
import authReducer from './authReducer';
import teamReducer from './teamReducer';
import playerReduce from './playerReducer';
import guessReducer from './guessReducer';
import userReducer from './userReducer';

export default combineReducers(
    {
        auth: authReducer,
        teams: teamReducer,
        players: playerReduce,
        guess: guessReducer,
        users: userReducer
    }
);