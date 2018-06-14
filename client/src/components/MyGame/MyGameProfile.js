import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import * as dates from '../../utils/date';
import _ from 'lodash';
import {Glyphicon} from 'react-bootstrap';
import PaymentAlert from '../Utils/PaymentAlert';

const checkRanking = (ranking) => {
    if(ranking == 1) return "Você está na liderança!";
    else if(ranking == 3) return "Vai ganhar abraço hein!";
    else if(ranking > 1 && ranking <= 5) return "Quase lá, falta pouco!";
    else if(ranking > 5 && ranking <= 10) return "Não desista, o jogo vira!";
    else return "Tá quase igual o random!";
};

class MyGameProfile extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount(){
        this.props.fetchRanking();
    }

    render(){
        try{
            let position = _.find(this.props.ranking, {"_id":this.props.id}).position;

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
                            <span className="date">Criado em {dates.getDate(this.props.guess.user.registerDate)}</span>
                        </div>
                        <div className="description">
                            # {position}º - {checkRanking(position)} <br />
                        </div>
                    </div>
                </div><br />
            {this.props.auth._id == this.props.id && <PaymentAlert name={this.props.guess.user.name} isPaid={this.props.guess.user.isPaid} />} 
                </div>
            );
        }
        catch(err){
            return(<div></div>);
        }
    }
}

function mapStateToProps({guess, auth, ranking}){
    return {guess, auth, ranking};
}

export default connect(mapStateToProps, actions)(MyGameProfile);