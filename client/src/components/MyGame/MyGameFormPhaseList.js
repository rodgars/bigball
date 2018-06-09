import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as utils from '../../utils/filtering';
import _ from 'lodash';
import PointsLabel from '../Utils/PointsLabel';
import Match from '../Utils/Match';
import Score from '../Utils/Score';

const showModal = (match) => {
    return typeof(match.stageIndex) != 'undefined';
};

class MyGameFormPhaseList extends Component {
    constructor(props, context){
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.selectMatch = this.selectMatch.bind(this);
        this.moveMatchModal = this.moveMatchModal.bind(this);
    
        this.state = {
          match: {}
        };
   }

    handleHide() {
        this.setState({ match: {} });
        this.handleMatchSubmit();
    }

    selectMatch(id,e){
        let stageId = id.split(";")[0];
        let matchId = id.split(";")[1];
        e.preventDefault();
        this.setState((state) => {
            return {
                match: {
                    stageIndex:stageId, 
                    matchIndex:matchId, 
                    guess:this.props.guess.stageGuesses[stageId].matchGuesses[matchId]
                }
            };
        });
        
    }

    moveMatchModal(val){
        let stageId = this.state.match.stageIndex;
        let matchId = this.state.match.matchIndex;
        let total = this.props.guess.stageGuesses[stageId].matchGuesses.length;
        let newMatchId = parseInt(matchId) + parseInt(val);

        if(newMatchId < 0 || newMatchId >= total) return;
        else {
            this.setState((state) => {
                return {
                    match: {
                        stageIndex:stageId, 
                        matchIndex:newMatchId, 
                        guess:this.props.guess.stageGuesses[stageId].matchGuesses[newMatchId]
                    }
                };
            });
        }

        this.handleMatchSubmit();
    }
    
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

        for(let i=0; i < stage.matchGuesses.length; i++){
            let match = stage.matchGuesses[i];

            children.push (
                <tr key={i}>
                    <td width="10%" style={{textAlign:"center"}}><input type="radio" name="optionsGroups" /></td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>
                        <Match match={match} teams={this.props.teams} />
                    </td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>
                        <Score guess={match.guess}/>
                    </td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>
                        {this.RenderResult(match.result)}
                    </td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)}>{match.group}<br/>14/06</td>
                    <td onClick={this.selectMatch.bind(this, `${ind};${i}`)} width="10%"><PointsLabel value={match.points} /></td>
                </tr>           
            );
        }

        return children;
    }

    RenderStages(){
        let stages = this.props.guess.stageGuesses;
        let stagesDom = [];

        for(let i=0; i < stages.length; i++){
            let stage = stages[i];

            stagesDom.push(
                <div key={i} className="ui segment">
                    <p className="text-danger text-right"><b>* Atenção!</b> Você não preencheu todos os jogos dessa fase</p>
                    <h4 className="ui horizontal divider header">
                        <i className="futbol icon"></i> {stage.relatedStage} - encerra em {stage.deadline}
                    </h4>
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

        return stagesDom;
    }
    
    render(){
        console.log("guess",this.props.guess);
        return(
            <div>
                {this.RenderStages()}
                {this.renderModal()}
            </div>
        );
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
                    <table className="ui collapsing table">
                        <tbody>
                        <tr>
                            <td style={{verticalAlign:"middle"}}><Match match={this.state.match.guess} teams={this.props.teams} /></td>
                            <td style={{verticalAlign:"middle"}}>
                                <div>
                                    <form ref={form => {this.frmMatch = form}}>
                                    <input ref={input => {this.txtVisitScore = input}} style={{width:"80px"}} type="number" min={0} value={this.state.match.guess.result.visitorScore} className="ui input" /><br/><br/>
                                    <input ref={input => {this.txtHomeScore = input}} style={{width:"80px"}} type="number" min={0} value={this.state.match.guess.result.visitorScore} className="ui input" /><br/><br/>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button disabled={this.disableButtonModal("pre")} className="ui button" onClick={this.moveMatchModal.bind(this, -1)}>Anterior</button>
                    <button disabled={this.disableButtonModal("nex")} className="ui button" onClick={this.moveMatchModal.bind(this, 1)}>Proximo</button>
                </Modal.Body>
                </Modal>
            );
        }else{
            return (<div></div>);
        }
    }

    handleMatchSubmit(){
        this.txtHomeScore.value = "";
        this.txtVisitScore.value = "";
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
}

function mapStateToProps({guess, teams}){
    return {guess, teams};
}

export default connect(mapStateToProps)(MyGameFormPhaseList);