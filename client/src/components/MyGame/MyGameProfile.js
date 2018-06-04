import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import PaymentAlert from '../Utils/PaymentAlert';

const MyGameProfile = (props) => {
    return (
        <div>
        <div className="ui card">
            <div className="image">
                <img src={props.auth.urlImg.replace("sz=50","sz=250")}  />
            </div>
            <div className="content">
                <div className="header"><Glyphicon glyph="user" /> {props.auth.name}</div>
                <div class="meta">
                    <span class="date">Primeiro acesso em 20/05</span>
                    <br />User Id: {props.auth.userId}
                </div>
                <div class="description">
                    # 2º - Quase lá! <br />
                </div>
            </div>
        </div><br />
        <PaymentAlert name={props.auth.name} isPaid={props.auth.isPaid} /> 
        </div>
    );
};

export default MyGameProfile;