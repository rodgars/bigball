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
                <img src={props.user.user.urlImg.replace("sz=50","sz=250")}  />
            </div>
            <div className="content">
                <div className="header"><Glyphicon glyph="user" /> {props.user.user.name}</div>
                <div class="meta">
                    <span class="date">Primeiro acesso em XXXXX</span>
                    <br />User Id: {props.user.user.userId}
                </div>
                <div class="description">
                    # {props.position}º - {checkRanking(props.position)} <br />
                </div>
            </div>
        </div><br />
        <PaymentAlert name={props.user.user.name} isPaid={props.user.user.isPaid} /> 
        </div>
    );
};

export default MyGameProfile;