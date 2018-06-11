import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Glyphicon} from 'react-bootstrap';
import PaymentAlert from '../Utils/PaymentAlert';
import * as actions from '../../actions';

const checkRanking = (ranking) => {
    if(ranking == 1) return "Você está na liderança!";
    else if(ranking > 1 && ranking <= 5) return "Quase lá, falta pouco!";
    else return "Não desista, o jogo vira!";
};

class MyGameProfile extends Component {
    constructor(props){
        super(props);

        this.state = {mygame:""};
    }

    componentDidMount(){
        this.props.fetchGuess(this.props.id);
    }

    render(){
        return (
            <div>
            <div className="ui card">
                <div className="image">
                    <img src={this.props.guess.user.urlImg.replace("sz=50","sz=250")}  />
                </div>
                <div className="content">
                    <div className="header"><Glyphicon glyph="user" /> {this.props.guess.user.name}</div>
                    <div className="meta">
                        User Id: {this.props.guess.user.userId}<br/>
                        <span className="date">Criado em {this.props.guess.user.registerDate}</span>
                    </div>
                    <div className="description">
                        # {this.props.guess.position}º - {checkRanking(this.props.guess.position)} <br />
                    </div>
                </div>
            </div><br />
            <PaymentAlert name={this.props.guess.user.name} isPaid={this.props.guess.user.isPaid} /> 
            </div>
        );
    }
}

function mapStateToProps({guess}){
    return {guess};
}

export default connect(mapStateToProps, actions)(MyGameProfile);