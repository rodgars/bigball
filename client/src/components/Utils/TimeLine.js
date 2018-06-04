import React from 'react';

const TimeLine = (props) => {
    return (

    <div className="ui fluid steps">
        <div className="disabled step">
            <i className="check icon"></i>
            <div className="content">
            <div className="title">Fase de Grupos</div>
            <div className="description">Fase Finalizada.<br />Envio encerrado</div>
            </div>
        </div>
        <div className="active step">
            <i className="hand point down icon"></i>
            <div className="content">
            <div className="title">Oitavas</div>
            <div className="description">Estamos aqui.<br />Envio encerrado</div>
            </div>
        </div>
        <div className="disabled step">
            <i className="ban icon"></i>
            <div className="content">
            <div className="title">Quartas</div>
            <div className="description">Fase ainda liberada.<br />Envio até 30/03</div>
            </div>
        </div>
        <div className="disabled step">
            <i className="ban icon"></i>
            <div className="content">
            <div className="title">Semis</div>
            <div className="description">Fase não liberada.<br />Envio não permitido</div>
            </div>
        </div>
        <div className="disabled step">
            <i className="ban icon"></i>
            <div className="content">
            <div className="title">Finais</div>
            <div className="description">Fase não liberada.<br />Envio não permitido</div>
            </div>
        </div>
    </div>

    );
};

export default TimeLine;