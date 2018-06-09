import React from 'react';
import * as utils from '../../utils/filtering';

const Score = (props) => {
    let visitorScore = "-";
    let homeScore = "-";
    let color = (a, b) => {
        if(a > b) return "ui green label";
        else return "ui label";
    };

    if(typeof(props.guess.visitorScore) != 'undefined'){
        visitorScore = props.guess.visitorScore;
        homeScore = props.guess.homeScore;
    }

    return (
        <div>
            <div className={color(visitorScore, homeScore)}><b>{visitorScore}</b></div><br/><br/>
            <div className={color(homeScore, visitorScore)}><b>{homeScore}</b></div><br/><br/>
        </div>
    );
};

export default Score;