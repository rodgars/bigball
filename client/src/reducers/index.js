import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import teamReducer from './teamReducer';
import playerReduce from './playerReducer';
import guessReducer from './guessReducer';

export default combineReducers(
    {
        auth: authReducer,
        teams: teamReducer,
        players: playerReduce,
        guess: guessReducer
    }
);