import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import PaymentAlert from '../Utils/PaymentAlert';

const checkRanking = (ranking) => {
    if(ranking == 1) return "Você está na liderança!";
    else if(ranking > 1 && ranking <= 5) return "Quase lá, falta pouco!";
    else return "Não desista, o jogo vira!";
};

const MyGameProfile = (props) => {
    return (
        <div>
        <div className="ui card">
            <div className="image">
                <img src={props.guess.user.urlImg.replace("sz=50","sz=250")}  />
            </div>
            <div className="content">
                <div className="header"><Glyphicon glyph="user" /> {props.guess.user.name}</div>
                <div className="meta">
                    User Id: {props.guess.user.userId}<br/>
                    <span className="date">Criado em {props.guess.user.registerDate}</span>
                </div>
                <div className="description">
                    # {props.guess.position}º - {checkRanking(props.guess.position)} <br />
                </div>
            </div>
        </div><br />
        <PaymentAlert name={props.guess.user.name} isPaid={props.guess.user.isPaid} /> 
        </div>
    );
};

export default MyGameProfile;