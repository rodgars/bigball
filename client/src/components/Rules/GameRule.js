import React from 'react';

const GameRule = () => {
    return (
        <div>
        <p><i class="file icon"></i>  <u><b>Regras</b></u></p>
        <br />

        <div className="row">
            <div className="col-xs-12">
                <table className="ui table">
                    <tbody>
                        <tr><td>Art. 43, § 2</td><td>O Jogador <span className="text-danger">Random</span> não paga e sua colocação só será considerada se ele for 1º colocado</td></tr>
                        <tr><td>Art. 12, § 9</td><td>Se o <span className="text-danger">Random</span> for 1º colocado todo o dinheiro arrecadado será revertido em churrasco de bicho morto</td></tr>
                        <tr><td>Art. 91, § 1</td><td>O 1º colocado (animal racional ou similar) recebe 60% do montante total</td></tr>
                        <tr><td>Art. 2, § 3</td><td>O 2º colocado recebe 30% do montante total</td></tr>
                        <tr><td>Art. 3, § 17</td><td>O 3º colocado ganha um abraço do <span className="text-danger">Gracinha</span></td></tr>
                        <tr><td>Art. 21, § 10</td><td>O 4º colocado recebe 10% do montante total</td></tr>
                        <tr><td>Art. 5, § 6</td><td>O bolão será realizado em três fases e o resultado final será computado pela soma da pontuação das três fases</td></tr>
                        <tr><td>Liminar</td><td>Ninguém chamado <span className="text-danger">Fernando</span> pode ficar entre os premiados</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-xs-8">
                <table className="ui table">
                    <thead>
                        <tr>
                            <th colspan="2">Pontuação / Explicação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-warning"><td><strong>Resultado</strong></td><td>2 pontos somados ao acertar o ganhador ou empate</td></tr>
                        <tr className="bg-warning"><td><strong>Saldo</strong></td><td>2 pontos somados ao acertar a diferença no placar</td></tr>
                        <tr className="bg-warning"><td><strong>Meio placar</strong></td><td>1 ponto somados ao acertar os gols marcados por um time</td></tr>
                        <tr className="bg-info"><td><strong>1º</strong></td><td>30 pontos somados se acertar o campeão</td></tr>
                        <tr className="bg-info"><td><strong>2º</strong></td><td>20 pontos somados se acertar o vice-campeão</td></tr>
                        <tr className="bg-info"><td><strong>3º</strong></td><td>10 pontos somados se acertar o terceiro colocado</td></tr>
                        <tr className="bg-success"><td><strong>Fator GP</strong></td><td>2x multiplicador dos gols marcados pela seleção "Seleção GP" (soma)</td></tr>
                        <tr className="bg-success"><td><strong>Fator GC</strong></td><td>2x multiplicador dos gols marcados pela seleção "Seleção GC" (subtrai)</td></tr>
                        <tr className="bg-success"><td><strong>Fator Art</strong></td><td>2x multiplicador dos gols marcados pelo jogador "Artilheiro" (soma)</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="col-xs-4">
                <p><b>Passaporte da Alegria:</b> R$ 20,00</p>
                <table className="ui table">
                    <thead><tr><th colspan="2">Premiamento</th></tr></thead>
                    <tbody>
                        <tr><td>1º colocado</td><td>60%</td></tr>
                        <tr><td>2º colocado</td><td>30%</td></tr>
                        <tr><td>4º colocado</td><td>10%</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br />
    </div>
    );
};

export default GameRule;