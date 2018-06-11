import React, {Component} from 'react';
import MyGameFormFactorsItem from './MyGameFormFactorsItem';
import MyGameFormPhaseList from './MyGameFormPhaseList';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';

const isLocked = (stages, current, id, authId) => {

    if(id !== authId) return true;

    let arr = _.filter(stages, stage => {
        return stage.relatedStage === current && stage.status === "opened";
    });

    if(arr.length > 0) return false;
    else return true;
}

class MyGameForm extends Component {
    constructor(props){
        super(props);

        this.state = { isEditable: false };
    }

    toggleEdition(action) {
        if(action === "save"){
            let firstPlace = this.txtFirstPlace.value();
            let secondPlace = this.txtSecondPlace.value();
            let thirdPlace = this.txtThirdPlace.value();
            let topScorer = this.txtTopScore.value();
            let gp = this.txtGP.value();
            let gc = this.txtGC.value();

            let global = this.props.guess.globalGuess;

            if(firstPlace.length > 0) global.firstPlace = firstPlace[0].id;
            if(secondPlace.length > 0) global.secondPlace = secondPlace[0].id;
            if(thirdPlace.length > 0) global.thirdPlace = thirdPlace[0].id;
            if(topScorer.length > 0) global.topScorer = topScorer[0].id;
            if(gc.length > 0) global.teamGC = gc[0].id;
            if(gp.length > 0) global.teamGP = gp[0].id;

            this.props.saveGlobalGuess(global);
        }
        this.setState({ isEditable: !this.state.isEditable});
    }

    checkGlobalGuesses(){
        if(isLocked(this.props.guess.stageGuesses,"groupStage",this.props.id,this.props.auth._id)) return "";
        else if(
            this.props.guess.globalGuess.firstPlace == null ||
            this.props.guess.globalGuess.secondPlace == null ||
            this.props.guess.globalGuess.thirdPlace == null ||
            this.props.guess.globalGuess.topScorer == null ||
            this.props.guess.globalGuess.teamGP == null ||
            this.props.guess.globalGuess.teamGC == null ||
            this.props.guess.globalGuess.firstPlace == "" ||
            this.props.guess.globalGuess.secondPlace == "" ||
            this.props.guess.globalGuess.thirdPlace == "" ||
            this.props.guess.globalGuess.topScorer == "" ||
            this.props.guess.globalGuess.teamGP == "" ||
            this.props.guess.globalGuess.teamGC == "")
        {
            return <p className="text-danger text-right">* <b>Atenção!</b> Você não preencheu todos os fatores</p>;
        }
        else{
            return <p className="text-success text-right">Todos fatores preenchidos !</p>;
        }
    }

    render(){
        console.log("global",this.props.guess.globalGuess);
        return (
            <div>
                <form>
                    <div className="ui segment">
                        {this.checkGlobalGuesses()}
                        {!isLocked(this.props.guess.stageGuesses, "groupStage",this.props.id,this.props.auth._id) && !this.state.isEditable && !this.props.guess.globalGuess.locked && <button onClick={this.toggleEdition.bind(this, "edit")} className="ui blue button"><i className="icon pencil"></i>Editar Fatores</button>}
                        {!isLocked(this.props.guess.stageGuesses, "groupStage",this.props.id,this.props.auth._id) && this.state.isEditable && <button onClick={this.toggleEdition.bind(this, "save")} className="ui blue button"><i className="icon save"></i>Salvar Fatores</button>}
                        {!isLocked(this.props.guess.stageGuesses, "groupStage",this.props.id,this.props.auth._id) && this.state.isEditable && <button onClick={this.toggleEdition.bind(this, "cancel")} className="ui red button"><i className="icon times"></i>Cancelar Edição</button>}

                        <h4 className="ui horizontal divider header">
                            <i className="bar chart icon"></i> Fatores - encerra em {this.props.guess.globalGuess.deadline}
                        </h4>
                        <br/>
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
                                <MyGameFormFactorsItem ref={el => this.txtFirstPlace = el} pick={this.props.guess.globalGuess.firstPlace} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsChampions} options={this.props.teams} field="Campeão da Copa" fieldPlaceholder="Preenche o nome do campeão" />
                                <MyGameFormFactorsItem ref={el => this.txtSecondPlace = el} pick={this.props.guess.globalGuess.secondPlace} edit={this.state.isEditable} points={0} options={this.props.teams} field="Vice-Campeão da Copa" fieldPlaceholder="Preenche o nome do vice-campeão" />
                                <MyGameFormFactorsItem ref={el => this.txtThirdPlace = el} pick={this.props.guess.globalGuess.thirdPlace} edit={this.state.isEditable} points={0} options={this.props.teams} field="Terceiro colocado da Copa" fieldPlaceholder="Preenche o nome do terceiro colocado" />
                                <MyGameFormFactorsItem ref={el => this.txtTopScore = el} isPlayer={true} pick={this.props.guess.globalGuess.topScorer} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsTopScorer}  optionsCountries={this.props.teams} options={this.props.players} isPlayer={true} field="Artilheiro" fieldPlaceholder="Preenche o nome do artilheiro" />
                                <MyGameFormFactorsItem ref={el => this.txtGP = el} pick={this.props.guess.globalGuess.teamGP} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsTeamGP} options={this.props.teams} field="Seleção GP (gols pró)" fieldPlaceholder="Preenche o nome da seleção GP" />
                                <MyGameFormFactorsItem ref={el => this.txtGC = el} pick={this.props.guess.globalGuess.teamGC} edit={this.state.isEditable} points={this.props.guess.globalGuess.pointsTeamGC} options={this.props.teams} field="Seleção GC (gols contra)" fieldPlaceholder="Preenche o nome da seleção GC" />
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <hr />
                    <MyGameFormPhaseList id={this.props.id} />
                </form>
            </div>
        );
    }
}

function mapStateToProps({teams,players,guess,auth}){
    return {teams,players,guess,auth};
}

export default connect(mapStateToProps, actions)(MyGameForm);