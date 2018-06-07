import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as utils from '../../utils/filtering';
import _ from 'lodash';
import PointsLabel from '../Utils/PointsLabel';

const checkUser = (user) => {
    return typeof(user.name) != 'undefined';
};

class MyGameFormPhaseList extends Component {
    constructor(props, context){
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.selectMatch = this.selectMatch.bind(this);
    
        this.state = {
          match: {}
        };
   }

    handleHide() {
        this.setState({ match: {} });
    }

    selectMatch(id,e){
        e.preventDefault();
        this.setState((state) => {
            return {match:{name:"Rodrigo Garcia",date:"20/03/2018",isAdmin:true,isPaid:false}};
        });
        
    }
    
    RenderResult(result, flagVisitor, flagHome, nameVisitor, nameHome){
        if(result.homeScore != null){
            return(
            <div class="ui breadcrumb">
                <div class="section"><img src="/assets/flags/blank.gif" className={flagVisitor} /></div>
                <div class="divider"></div>
                <div class="section">{result.visitorScore}</div>
                <div class="divider"> <i className="times icon"></i> </div>
                <div class="section">{result.homeScore}</div>
                <div class="divider"></div>
                <div class="section"><img src="/assets/flags/blank.gif" className={flagHome} /></div>
            </div>);
        }else{
            return(<div>Não disponível</div>);
        }
    }

    RenderMatches(stage){
        return _.map(stage.matchGuesses, match => {
            let flagVisitor = (typeof(match.visitorTeam) != 'undefined') ? `flag-32 flag-${match.visitorTeam}` : "";
            let flagHome = (typeof(match.homeTeam) != 'undefined') ? `flag-32 flag-${match.homeTeam}` : "";
            let nameVisitor = (typeof(match.visitorTeam) != 'undefined') ? utils.filterCountry(match.visitorTeam, this.props.teams)[0].name : "Indefinido";
            let nameHome = (typeof(match.homeTeam) != 'undefined') ? utils.filterCountry(match.homeTeam, this.props.teams)[0].name : "Indefinido";

            return (
                <tr>
                    <td width="10%" style={{textAlign:"center"}}><input type="radio" name="optionsGroups" /></td>
                    <td onClick={this.selectMatch.bind(this, `${stage.relatedStage}`)}>
                        <img src="/assets/flags/blank.gif" className={flagVisitor} /> {nameVisitor}<br/> vs<br/>
                        <img src="/assets/flags/blank.gif" className={flagHome} /> {nameHome}<br/><br/>
                    </td>
                    <td>
                        <div class="ui label"><b>{match.guess.homeScore}-</b></div><br/><br/>
                        <div class="ui label"><b>{match.guess.homeScore}-</b></div><br/><br/>
                    </td>
                    <td>
                        {this.RenderResult(match.result, flagVisitor, flagHome, nameVisitor, nameHome)}
                    </td>
                    <td>{match.group}<br/>14/06</td>
                    <td width="10%"><PointsLabel value={match.points} /></td>
                </tr>           
            );
        });
    }

    RenderStages(){
        return _.map(_.orderBy(_.filter(this.props.guess.stageGuesses, (item) => {
            return !item.locked;
        }),['order'],['desc']), stage => {
            return (
                <div className="ui segment">
                    <p className="text-danger text-right"><b>* Atenção!</b> Você não preencheu todos os jogos dessa fase</p>
                    <h4 class="ui horizontal divider header">
                        <i class="futbol icon"></i> {stage.relatedStage} - encerra em {stage.deadline}
                    </h4>
                    <div>
                        <table class="ui small table">
                            <thead>
                                <tr>
                                    <th>Dobra?</th>
                                    <th colspan="2">Seu palpite</th>
                                    <th>Resultado oficial</th>
                                    <th>Partida</th>
                                    <th>Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.RenderMatches(stage)}
                            </tbody>
                        </table> 
                    </div>
                </div>
            );
        });
    }
    
    render(){
        console.log(this.props.guess);
        return(
            <div>
                {this.RenderStages()}
                <Modal
                {...this.props}
                show={checkUser(this.state.match)}
                onHide={this.handleHide}
                dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                    <i class="futbol icon"></i> Preencher jogos da fase
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Aqui
                </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({guess, teams}){
    return {guess, teams};
}

export default connect(mapStateToProps)(MyGameFormPhaseList);