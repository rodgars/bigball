import React,{Component} from 'react';
import {Alert} from 'react-bootstrap';

class PaymentAlert extends Component{
    constructor(props){
        super(props);

        this.handleDismiss = this.handleDismiss.bind(this);
        this.state = {
            show: true
        };
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    render(){
        if(this.state.show && !this.props.isPaid){
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <strong>Olá {this.props.name}!</strong> Você ainda não realizou o pagamento. <br/>Caso já tenha realizado, por favor avisar no grupo do whatsApp
                </Alert>
            );
        }
        return <span></span>;
    }
}

export default PaymentAlert;