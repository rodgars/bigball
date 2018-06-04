import React, {Component} from 'react';
import MyGameFormFactorsItem from './MyGameFormFactorsItem';
import MyGameFormPhaseList from './MyGameFormPhaseList';
import {connect} from 'react-redux';

class MyGameForm extends Component {
    constructor(props){
        super(props);

        this.state = { isEditable: false };
    }

    toggleEdition() {
        this.setState({isEditable: !this.state.isEditable});
    }

    render(){
        return (
            <div>
                {!this.state.isEditable && <button onClick={this.toggleEdition.bind(this)} className="ui blue button"><i className="icon pencil"></i>Editar jogos</button>}
                {this.state.isEditable && <button onClick={this.toggleEdition.bind(this)} className="ui blue button"><i className="icon save"></i>Salvar jogos</button>}
                {this.state.isEditable && <button onClick={this.toggleEdition.bind(this)} className="ui red button"><i className="icon times"></i>Cancelar edição</button>}
                <hr />
                <form>
                    <div className="ui segment">
                        <p className="text-danger">* <b>Atenção!</b> Você não preencheu todos os fatores</p>          
                        <h4 class="ui horizontal divider header">
                            <i class="bar chart icon"></i> Fatores - encerra em 14/06
                        </h4>
                        <div>
                        <table className="ui small compact definition table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Seus palpites</th>
                                    <th>Acompanhamento</th>
                                    <th>Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <MyGameFormFactorsItem pick="br" edit={this.state.isEditable} points={4} options={this.props.teams} field="Campeão da Copa" fieldPlaceholder="Preenche o nome do campeão" />
                                <MyGameFormFactorsItem pick="ar" edit={this.state.isEditable} points={0} options={this.props.teams} field="Vice-Campeão da Copa" fieldPlaceholder="Preenche o nome do vice-campeão" />
                                <MyGameFormFactorsItem pick="de" edit={this.state.isEditable} points={0} options={this.props.teams} field="Terceiro colocado da Copa" fieldPlaceholder="Preenche o nome do terceiro colocado" />
                                <MyGameFormFactorsItem pick="Neymar" edit={this.state.isEditable} points={4} options={this.props.players} isPlayer={true} field="Artilheiro" fieldPlaceholder="Preenche o nome do artilheiro" />
                                <MyGameFormFactorsItem pick="br" edit={this.state.isEditable} points={-4} options={this.props.teams} field="Seleção GP (gols pró)" fieldPlaceholder="Preenche o nome da seleção GP" />
                                <MyGameFormFactorsItem pick="" edit={this.state.isEditable} points={4} options={this.props.teams} field="Seleção GC (gols contra)" fieldPlaceholder="Preenche o nome da seleção GC" />
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <hr />
                    <MyGameFormPhaseList edit={this.state.isEditable} />
                </form>
            </div>
        );
    }
}

function mapStateToProps({teams,players}){
    return {teams,players};
}

export default connect(mapStateToProps)(MyGameForm);