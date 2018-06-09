import React from 'react';
import * as utils from '../../utils/filtering';

const Match = (props) => {
    let flagVisitor = (typeof(props.match.visitorTeam) != 'undefined') ? `flag-32 flag-${props.match.visitorTeam}` : "";
    let flagHome = (typeof(props.match.homeTeam) != 'undefined') ? `flag-32 flag-${props.match.homeTeam}` : "";
    let nameVisitor = (typeof(props.match.visitorTeam) != 'undefined') ? utils.filterCountry(props.match.visitorTeam, props.teams)[0].name : "Indefinido";
    let nameHome = (typeof(props.match.homeTeam) != 'undefined') ? utils.filterCountry(props.match.homeTeam, props.teams)[0].name : "Indefinido";

    return (
        <div>
            <img src="/assets/flags/blank.gif" className={flagVisitor} /> {nameVisitor}<br/> vs<br/>
            <img src="/assets/flags/blank.gif" className={flagHome} /> {nameHome}<br/><br/>
        </div>
    );
};

export default Match;