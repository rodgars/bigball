import React from 'react';

const RenderPhases = (props) => {
    return (
        <div className="ui segment">
            <p className="text-danger"><b>* Atenção!</b> Você não preencheu todos os jogos dessa fase</p>
            <p className="text-danger"><b>* Atenção!</b> Você não selecionou o jogo dobra pontos dessa fase</p>
            <h4 class="ui horizontal divider header">
                <i class="futbol icon"></i> Fase de Grupos - encerra em 14/06
            </h4>
            <div>
                {RenderGroups(props)}
            </div>
        </div>
    );
};

const RenderGroupsList = (props) => {
    if(props.edit){
        return(
            <tr>
                <td><input type="radio" name="optionsGroups" /></td>
                <td>
                <div class="ui breadcrumb">
                    <div class="section"><img src="/assets/flags/blank.gif" className="flag-32 flag-br" /> Brasil</div>
                    <div class="divider"></div>
                    <div class="section"><input type="text" style={{width:"30px"}}/></div>
                    <div class="divider"> <i className="times icon"></i> </div>
                    <div class="section"><input type="text" style={{width:"30px"}}/></div>
                    <div class="divider"></div>
                    <div class="section">Bélgica <img src="/assets/flags/blank.gif" className="flag-32 flag-be" /></div>
                </div>
                </td>
                <td>
                    22/04/18
                </td>
                <td>
                    Não disponível
                </td>
                <td><a className="ui grey label">0 pts</a></td>
            </tr>
        );
    }else{
        return(
            <tr>
                <td><i className="arrow circle right icon"></i></td>
                <td>
                    <div class="ui breadcrumb">
                        <div class="section"><img src="/assets/flags/blank.gif" className="flag-32 flag-br" /> Brasil</div>
                        <div class="divider"></div>
                        <div class="section"><span style={{width:"30px"}}>2</span></div>
                        <div class="divider"> <i className="times icon"></i> </div>
                        <div class="section"><span style={{width:"30px"}}>2</span></div>
                        <div class="divider"></div>
                        <div class="section">Bélgica <img src="/assets/flags/blank.gif" className="flag-32 flag-be" /></div>
                    </div>
                </td>
                <td>
                    22/04/18
                </td>
                <td>
                    <img src="/assets/flags/blank.gif" className="flag-32 flag-br" /> Brasil <strong> 2</strong> <i className="times icon"></i><strong>2 </strong> Bélica <img src="/assets/flags/blank.gif" className="flag-32 flag-be" />
                </td>
                <td><a className="ui blue label">4 pts</a></td>
            </tr>
        );
    }
};

const RenderGroups = (props) => {
    return (
        <div class="panel panel-primary">
            <div class="panel-heading">Grupo A</div>
            <div class="panel-body">
                <div className="table-responsive">
                <table class="ui small table">
                    <thead>
                        <tr>
                            <th>Dobra?</th>
                            <th>Seu palpite</th>
                            <th>Data do jogo</th>
                            <th>Resultado oficial</th>
                            <th>Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RenderGroupsList(props)}
                    </tbody>
                </table>               
            </div> 
        </div>
    </div>
    );
};

const MyGameFormPhaseList = (props) => {
    return RenderPhases(props);
};

export default MyGameFormPhaseList;