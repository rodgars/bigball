import React from 'react';
import * as utils from '../../utils/filtering';

const Score = (props) => {
    let visitorScore = "-";
    let homeScore = "-";
    let winner = props.guess.winner;
    let visitorTeam = (typeof(props.teams) == 'undefined') ? "" : props.teams.visitorTeam;
    let homeTeam = (typeof(props.teams) == 'undefined') ? "" : props.teams.homeTeam;

    let color = (a, b) => {
        if(a > b) return "ui green label";
        else if (a == b && a != "-") return "ui yellow label";
        else return "ui label";
    };

    if(typeof(props.guess.visitorScore) != 'undefined'){
        visitorScore = props.guess.visitorScore;
        homeScore = props.guess.homeScore;
    }

    return (
        <div>
            <div className={color(visitorScore, homeScore)}><b>{visitorScore}</b></div>{renderWinner(props.teams, winner, visitorTeam, visitorScore, homeScore)}<br/><br/>
            <div className={color(homeScore, visitorScore)}><b>{homeScore}</b></div>{renderWinner(props.teams, winner, homeTeam, visitorScore, homeScore)}<br/><br/>
        </div>
    );
};

const renderWinner = (match, winner, team, scoreVisitor, scoreHome) => {
    if(scoreHome == scoreVisitor && scoreHome != "-" && team == winner && winner != ""){
        return (<b> * V</b>);
    }else{
        return "";
    }
};

export default Score;