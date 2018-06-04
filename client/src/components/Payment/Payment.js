import React, {Component} from 'react';
import {connect} from 'react-redux';

class Payment extends Component {
    render(){
        return (
            <div>
            <p><i class="dollar sign icon"></i>  <u><b>Como Pagar</b></u></p>
            <br />
            <div className="ui segment">
                <p>É simples, faça uma transferência para:</p>
                <hr />
                <p><strong>Banco:</strong> Itaú</p>
                <p><strong>Agência:</strong> 1234</p>
                <p><strong>Conta:</strong> 12345-6</p>
                <p><strong>Valor:</strong> R$ 20,00</p>
                <hr />
                <p>No comprovante, informe seu ID de jogador, que nesse caso é <strong>{this.props.auth.userId}</strong></p>
                <br />
            </div>
            <br /><br />
            </div>
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps)(Payment);