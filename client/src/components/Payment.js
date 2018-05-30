import React from 'react';

const Payment = () => {
    return (
        <div class="row">
        <div class="col s12 m6">
        <div class="card light-blue darken-2">
            <div class="card-content white-text">
            <span class="card-title"><u>Como Pagar</u></span>
            <p>É simples, faça uma transferência para:</p>
            <br />
            <p><strong>Banco:</strong> Itaú</p>
            <p><strong>Agência:</strong> 1234</p>
            <p><strong>Conta:</strong> 12345-6</p>
            <p><strong>Valor:</strong> R$ 20,00</p>
            <br />
            <p>Na referência, informe seu ID, que nesse caso é <strong>1</strong></p>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Payment;