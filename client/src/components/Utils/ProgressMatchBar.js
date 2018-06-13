import React from 'react';
import _ from 'lodash';

const ProgressMatchBar = (props) => {

    let countTotal = props.stages[props.state.stageIndex].matchGuesses.length;
    let arr = _.filter(props.stages[props.state.stageIndex].matchGuesses, match => {
        return typeof(match.guess.visitorScore) != 'undefined' && typeof(match.guess.homeScore) != 'undefined'
    });
    let countCurrent = arr.length;
    let percentage = parseInt((countCurrent / countTotal) * 100);

    return (
        <div>
        {countCurrent} de {countTotal} palpites!
        <div className="progress">
            <div className="progress-bar progress-bar-info" style={{width:`${percentage}%`}}>{percentage}%</div>
        </div>
        </div>
    );
};

export default ProgressMatchBar;