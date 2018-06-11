import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Payment extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount(){
        this.props.fetchAccount();
    }

    render(){
        return (
            <div>
            <p><i className="dollar sign icon"></i>  <u><b>Como Pagar</b></u></p>
            <br />
            <div className="ui segment">
                <p>É simples, faça uma transferência para:</p>
                <hr />
                <p><strong>Banco:</strong> {this.props.account.bank}</p>
                <p><strong>Agência:</strong> {this.props.account.agency}</p>
                <p><strong>Conta:</strong> {this.props.account.account}</p>
                <p><strong>Valor:</strong> R$ 20,00</p>
                <hr />
                <p>No comprovante, informe seu ID de jogador, que nesse caso é: <strong>[ {this.props.auth.userId} ]</strong></p>
                <br />
            </div>
            <br /><br />
            </div>
        );
    }
}

function mapStateToProps({auth, account}){
    return {auth, account};
}

export default connect(mapStateToProps, actions)(Payment);