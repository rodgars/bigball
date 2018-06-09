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
        this.setState({ isEditable: !this.state.isEditable});
    }

    checkGlobalGuesses(){
        if(
            this.props.guess.globalGuess.firstPlace == null ||
            this.props.guess.globalGuess.secondPlace == null ||
            this.props.guess.globalGuess.thirdPlace == null ||
            this.props.guess.globalGuess.topScorer == null ||
            this.props.guess.globalGuess.teamGP == null ||
            this.props.guess.globalGuess.teamGC == null)
        {
            return <p className="text-danger text-right">* <b>Atenção!</b> Você não preencheu todos os fatores</p>;
        }
        else{
            return "";
        }
    }

    render(){
        return (
            <div>
                <form>
                    <div className="ui segment">
                        {this.checkGlobalGuesses()}
                        {!this.state.isEditable && !this.props.guess.globalGuess.locked && <button onClick={this.toggleEdition.bind(this)} className="ui blue button"><i className="icon pencil"></i>Editar Fatores</button>}
                        {this.state.isEditable && <button onClick={this.toggleEdition.bind(this)} className="ui blue button"><i className="icon save"></i>Salvar Fatores</button>}
                        {this.state.isEditable && <button onClick={this.toggleEdition.bind(this)} className="ui red button"><i className="icon times"></i>Cancelar Edição</button>}

                        <h4 className="ui horizontal divider header">
                            <i className="bar chart icon"></i> Fatores - encerra em {this.props.guess.globalGuess.deadline}
                        </h4>
                        <div>
                        <table className="ui small compact table">
                            <thead>
                                <tr>
                                    <th>Fatores</th>
                                    <th>Seus palpites</th>
                                    <th>Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <MyGameFormFactorsItem isPlayer={false} pick={this.props.guess.globalGuess.firstPlace} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsChampions} options={this.props.teams} field="Campeão da Copa" fieldPlaceholder="Preenche o nome do campeão" />
                                <MyGameFormFactorsItem isPlayer={false} pick={this.props.guess.globalGuess.secondPlace} edit={this.state.isEditable} points={0} options={this.props.teams} field="Vice-Campeão da Copa" fieldPlaceholder="Preenche o nome do vice-campeão" />
                                <MyGameFormFactorsItem isPlayer={false} pick={this.props.guess.globalGuess.thirdPlace} edit={this.state.isEditable} points={0} options={this.props.teams} field="Terceiro colocado da Copa" fieldPlaceholder="Preenche o nome do terceiro colocado" />
                                <MyGameFormFactorsItem isPlayer={true} pick={this.props.guess.globalGuess.topScorer} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsTopScorer} options={this.props.players} isPlayer={true} field="Artilheiro" fieldPlaceholder="Preenche o nome do artilheiro" />
                                <MyGameFormFactorsItem isPlayer={false} pick={this.props.guess.globalGuess.teamGP} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsTeamGP} options={this.props.teams} field="Seleção GP (gols pró)" fieldPlaceholder="Preenche o nome da seleção GP" />
                                <MyGameFormFactorsItem isPlayer={false} pick={this.props.guess.globalGuess.teamGC} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsTeamGC} options={this.props.teams} field="Seleção GC (gols contra)" fieldPlaceholder="Preenche o nome da seleção GC" />
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

function mapStateToProps({teams,players,guess}){
    return {teams,players,guess};
}

export default connect(mapStateToProps)(MyGameForm);