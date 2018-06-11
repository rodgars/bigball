import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as utils from '../../utils/filtering';
import _ from 'lodash';
import * as drops from '../../utils/dropdown';
import PointsLabel from '../Utils/PointsLabel';
import DropDown from '../Utils/DropDown';
import Match from '../Utils/Match';
import Score from '../Utils/Score';
import * as actions from '../../actions/MyGameActions';

const showModal = (match) => {
    return typeof(match.stageIndex) != 'undefined';
};

class MyGameFormPhaseList extends Component {
    constructor(props, context){
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.saveAndExit = this.saveAndExit.bind(this);
        this.selectMatch = this.selectMatch.bind(this);
        this.moveMatchModal = this.moveMatchModal.bind(this);
    
        this.state = {
          match: {},
          alertStages: { id:"", msgDouble:"", msgMatches:""},
          alertWinner: ""
        };
   }

    // STATE METHODS
    handleHide() {
        this.setState({ match: {} });
    }

    saveAndExit() {
        if(this.validateGuess()){
            this.handleMatchSubmit();
            this.props.fetchGuess(this.props.id);
            this.setState({ match: {} });
        }else{
            alert("Por favor preencher todos os campos antes de sair");
        }
    }

    selectMatch(id,e){
        let stageId = id.split(";")[0];
        let matchId = id.split(";")[1];
        e.preventDefault();
        if(this.props.guess.stageGuesses[stageId].status == "opened"){
            this.setState({
                match: {
                    stageIndex:stageId, 
                    matchIndex:matchId, 
                    guess:this.props.guess.stageGuesses[stageId].matchGuesses[matchId]
                }
            });
        }
    }

    validateGuess(){
        if(
            this.txtHomeScore == null || 
            this.txtVisitScore == null ||
            this.txtHomeScore.value == "" || 
            this.txtVisitScore.value == "" ||
            (this.txtHomeScore.value == this.txtVisitScore.value && 
            this.txtVisitScore.value != "" &&
            this.props.guess.stageGuesses[this.state.match.stageIndex].relatedStage != "groupStage" &&
            this.ddlWinner.value() == "")) return false;
        return true;
    }

    moveMatchModal(val){
        if(this.validateGuess()){
            // update the current guess
            this.handleMatchSubmit();

            // move to previous or next guess
            let stageId = this.state.match.stageIndex;
            let matchId = this.state.match.matchIndex;
            let total = this.props.guess.stageGuesses[stageId].matchGuesses.length;
            let newMatchId = parseInt(matchId) + parseInt(val);

            if(newMatchId >= 0 && newMatchId < total){
                let guess = this.props.guess.stageGuesses[stageId].matchGuesses[newMatchId];
                if(typeof(guess.guess.homeScore) == 'undefined') guess.guess.homeScore = "";
                if(typeof(guess.guess.visitorScore) == 'undefined') guess.guess.visitorScore = "";
                this.setState((state) => {
                    return {
                        match: {
                            stageIndex:stageId, 
                            matchIndex:newMatchId, 
                            guess: guess
                        }
                    };
                });
            }
        }else{
            alert("Por favor preencher todos os campos antes de movimentar");
        }
    }

    handleMatchSubmit(){
        let guessToUpdate = this.state.match.guess;
        guessToUpdate.guess.homeScore = this.txtHomeScore.value;
        guessToUpdate.guess.visitorScore = this.txtVisitScore.value;

        if(this.txtVisitScore.value > this.txtHomeScore.value) guessToUpdate.guess.winner = this.state.match.guess.visitorTeam;
        else if(this.txtHomeScore.value > this.txtVisitScore.value) guessToUpdate.guess.winner = this.state.match.guess.homeTeam;
        else guessToUpdate.guess.winner = (this.props.guess.stageGuesses[this.state.match.stageIndex].relatedStage != "groupStage") ? this.ddlWinner.value() : "";

        this.props.saveGuess(guessToUpdate);
    }

    onChangeScore(value, field){
        let stateToChange = this.state.match;
        if(field === "home") stateToChange.guess.guess.homeScore = value;
        else stateToChange.guess.guess.visitorScore = value;
        this.setState({match: stateToChange});
    }

    disableButtonModal(btn){
        if(btn === "pre"){
            if(this.state.match.matchIndex === 0) return true;
            else return false;
        }else{
            if(this.state.match.matchIndex + 1 === this.props.guess.stageGuesses[this.state.match.stageIndex].matchGuesses.length) return true;
            else return false;
        }
    }

    modalStageName(){
        if(showModal(this.state.match)){
            let index = this.state.match.stageIndex;
            return this.props.guess.stageGuesses[index].relatedStage;
        }
        return "";
    }
    
    // RENDER METHODS
    RenderResult(result){
        if(result.homeScore != null){
            return(
                <Score guess={result}/>
            );
        }else{
            return(<div>Não disponível</div>);
        }
    }

    RenderMatches(stage, ind){
        let children = [];

        for(let i=0; stage.matchGuesses != null && i < stage.matchGuesses.length; i++){
            let match = stage.matchGuesses[i];

            children.push (
                <tr key={i}>
                    <td width="10%" style={{textAlign:"center"}}><input type="radio" name="optionsGroups" /></td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>
                        <Match match={match} teams={this.props.teams} />
                    </td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>
                        <Score teams={match} guess={match.guess}/>
                    </td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>
                        {this.RenderResult(match.result)}
                    </td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>{match.group}<br/>{match.date}</td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)} width="10%"><PointsLabel value={match.points} /></td>
                </tr>           
            );
        }

        return children;
    }

    RenderAlertStages(stage){
        let arr = _.filter(stage.matchGuesses, match => {
            return typeof(match.guess.visitorScore) == 'undefined' || typeof(match.guess.homeScore) == 'undefined'
        });

        if(arr.length > 0)
            return (
                <p className="text-danger text-right"><b>* Atenção!</b> Você não preencheu todos os jogos dessa fase</p>
            );
        else
            return (<br />)
    }

    RenderStages(){
        let stages = this.props.guess.stageGuesses;
        let stagesDom = [];

        for(let i=0; i < stages.length; i++){
            let stage = stages[i];

            if(stage.matchGuesses.length > 0){
                stagesDom.push(
                    <div key={i} className="ui segment">
                        {this.RenderAlertStages(stage)}
                        <h4 className="ui horizontal divider header">
                            <i className="futbol icon"></i> {stage.label} - encerra em {stage.deadline}
                        </h4>
                        <br/>
                        <div>
                            <table className="ui small selectable table">
                                <thead>
                                    <tr>
                                        <th>Dobra?</th>
                                        <th colSpan="2">Seu palpite</th>
                                        <th>Resultado oficial</th>
                                        <th>Partida</th>
                                        <th>Pontos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.RenderMatches(stage, i)}
                                </tbody>
                            </table> 
                        </div>
                    </div>
                );
            }
        }

        return stagesDom;
    }

    renderModal(){
        if(showModal(this.state.match)){
            return(
                <Modal
                show={showModal(this.state.match)}
                onHide={this.handleHide}
                bsSize="small"
                dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                    <i className="futbol icon"></i> Preencher jogos da {this.modalStageName()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="ui table">
                        <tbody>
                        <tr>
                            <td style={{verticalAlign:"middle"}}><Match match={this.state.match.guess} teams={this.props.teams} /></td>
                            <td style={{verticalAlign:"middle"}}>
                                <div>
                                    <form ref={form => {this.frmMatch = form}}>
                                    <input onInput={e => this.onChangeScore(e.target.value, "visitor")} ref={input => {this.txtVisitScore = input}} style={{width:"80px"}} type="number" min={0} value={this.state.match.guess.guess.visitorScore} className="ui input" /><br/><br/>
                                    <input onInput={e => this.onChangeScore(e.target.value, "home")} ref={input => {this.txtHomeScore = input}} style={{width:"80px"}} type="number" min={0} value={this.state.match.guess.guess.homeScore} className="ui input" /><br/><br/>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {this.renderWinner()}        
                    <button disabled={this.disableButtonModal("pre")} className="ui button" onClick={this.moveMatchModal.bind(this, -1)}><i className="icon angle double left"></i> Anterior</button>
                    <button disabled={this.disableButtonModal("nex")} className="ui button" onClick={this.moveMatchModal.bind(this, 1)}>Proximo <i className="icon angle double right"></i></button>
                    <br/><br/><button className="ui blue button" onClick={this.saveAndExit}><i className="icon save"></i> Salvar e Sair</button>
                </Modal.Body>
                </Modal>
            );
        }else{
            return (<div></div>);
        }
    }

    renderWinner(){
        let visitorScore = this.state.match.guess.guess.visitorScore;
        let homeScore = this.state.match.guess.guess.homeScore;
        let winnerValue = this.state.match.guess.guess.winner;
        
        if(
            visitorScore == homeScore &&
            visitorScore != "" &&
            this.props.guess.stageGuesses[this.state.match.stageIndex].relatedStage != "groupStage"
        ){
            return (
                <div className="ui segment">
                    <b>Vencedor (penalts / empate):</b> <DropDown ref={ddl => this.ddlWinner = ddl} id="ddlWinner" values={drops.dataWinner(this.props.teams, this.state.match.guess)} selected={winnerValue}  />
                    <br/>
                </div>
            );
        }
        else
            return <div></div>
    }

    render(){
        return(
            <div>
                {this.RenderStages()}
                {this.renderModal()}
            </div>
        );
    }
}

function mapStateToProps({guess, teams}){
    return {guess, teams};
}

export default connect(mapStateToProps, actions)(MyGameFormPhaseList);