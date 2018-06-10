import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import _ from 'lodash';
import DropDown from '../Utils/DropDown';
import * as utils from '../../utils/filtering';
import * as drops from '../../utils/dropdown';
import * as actions from '../../actions/AdminActions';

const showModal = (match) => {
    return typeof(match._id) != 'undefined';
};

class AdminMatchs extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.selectedStageId = this.selectedStageId.bind(this);
        this.submitMatch = this.submitMatch.bind(this);

        this.state = {
            match: {},
        };
    }

    componentDidMount(){
        this.props.fetchStages();
    }

    handleSubmit(event){
        event.preventDefault();

        const data = {
            _id: event.target[0].value, 
            situation: event.target[1].value, 
            status: event.target[2].value
        };
        this.props.saveStages(data);
        this.props.fetchStages();
        this.setState({ match: {} });
    }

    selectedStageId(match,e){
        e.preventDefault();
        this.setState((state) => {
            return { match: match };
        });
    }

    submitMatch(){
        let match = this.state.match;
        match.visitorTeam = this.ddlVisitor.value();
        match.homeTeam = this.ddlHome.value();
        match.winner = this.ddlWinner.value();
        match.visitorScore = this.txtVisitorScore.value;
        match.homeScore = this.txtHomeScore.value;

        if(match.visitorTeam == "" ||
            match.homeTeam == "" ||
            match.winner == "" ||
            match.visitorScore == "" ||
            match.homeScore == "")
        {
            alert("Preencha todos os campos");
        }else{
            this.props.saveMatch(match);
            this.props.fetchStages();
            this.setState({ match: {} });
        }
    }

    handleHide() {
        this.setState({ match: {} });
    }

    RenderGames(matches){
        return _.map(_.orderBy(matches,["date"],["asc"]), match => {
            let visitorTeam = utils.filterCountry(match.visitorTeam, this.props.teams)[0];
            let homeTeam = utils.filterCountry(match.homeTeam, this.props.teams)[0];
            let winner = utils.filterCountry(match.winner, this.props.teams)[0];
            
            if(typeof(visitorTeam) == 'undefined') visitorTeam = {name:"Não definido", flag:""};
            if(typeof(homeTeam) == 'undefined') homeTeam = {name:"Não definido", flag:""};
            if(typeof(winner) == 'undefined') winner = {name:"Não definido", flag:""};

            return (    
                <tr onClick={this.selectedStageId.bind(this, match)}>
                    <td>{match._id}</td>
                    <td>{match.group}</td>
                    <td>{match.date}</td>
                    <td><img className={visitorTeam.flag} src="./assets/flags/blank.gif" /> {visitorTeam.name} - {match.visitorScore}</td>
                    <td><img className={homeTeam.flag} src="./assets/flags/blank.gif" /> {homeTeam.name} - {match.homeScore}</td>
                    <td><img className={winner.flag} src="./assets/flags/blank.gif" /> {winner.name}</td>
                </tr>
            );
        });
    }

    RenderStages(){
        return _.map(_.orderBy(this.props.stages,["order"],["asc"]), stage => {
            return(
            <div>
            <div className="ui segment">
                <form id={stage._id} name={stage._id} key={stage._id} onSubmit={this.handleSubmit}>
                <input type="hidden" id="id" name="id" value={stage._id} />
                <div className="ui grid">
                    <div className="three wide column">( {stage.order} ) - {stage.deadline}</div>
                    <div className="three wide column">{stage._id}<br/>{stage.label}</div>
                    <div className="four wide column"><DropDown id="situation" key={`${stage._id}_sit`} values={drops.dataValues(this.props.situation)} selected={stage.situation} /></div>
                    <div className="four wide column"><DropDown id="status" key={`${stage._id}_loc`} values={drops.dataValues(this.props.status)} selected={stage.status} /></div>
                    <div className="two wide column"><button key={`${stage._id}_btn`} type="submit" className="ui icon blue button"><i className="save icon"></i> Salvar</button></div>
                </div>
                </form>
                <hr />
                <table className="ui selectable table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Group</th>
                            <th>Date</th>
                            <th>Visitor</th>
                            <th>Home</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.RenderGames(stage.matches)}
                    </tbody>
                </table>
            </div><br/><br/>
            </div>
            );
        });
    }

    render(){
        return (
            <div>
                <br />
                <h5>Fases:</h5>
                {this.RenderStages()}
                <Modal
                    show={showModal(this.state.match)}
                    onHide={this.handleHide}
                    dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                    <i className="futbol icon"></i> Match Official Result
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="ui table">
                        <tbody>
                        <tr>
                            <td><b>Visitor</b></td>
                            <td>
                                <div className="ui grid">
                                    <div className="eight wide column">
                                        <DropDown ref={ddl => this.ddlVisitor = ddl} id="ddlVisitorTeam" values={drops.dataTeams(this.props.teams)} selected={this.state.match.visitorTeam} />
                                    </div>
                                    <div className="four wide column">
                                        <input ref={input => {this.txtVisitorScore = input}} style={{width:"80px"}} type="number" min={0} value={this.state.match.visitorScore} className="ui input" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Home</b></td>
                            <td>
                                <div className="ui grid">
                                    <div className="eight wide column">
                                        <DropDown ref={ddl => this.ddlHome = ddl} id="ddlHomeTeam" values={drops.dataTeams(this.props.teams)} selected={this.state.match.homeTeam}  />
                                    </div>
                                    <div className="four wide column">
                                        <input ref={input => {this.txtHomeScore = input}} style={{width:"80px"}} type="number" min={0} value={this.state.match.homeScore} className="ui input" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <div className="ui grid">
                        <div className="two wide column">
                            <b>Winner: </b>
                        </div>
                        <div className="eight wide column">
                            <DropDown  ref={ddl => this.ddlWinner = ddl} id="situation" values={drops.dataTeams(this.props.teams)} selected={this.state.match.winner} />
                        </div>
                        <div className="six wide column">
                            <button className="ui blue button" onClick={this.submitMatch}><i className="icon save"></i>Save</button>
                        </div>
                    </div>
                    <br/><br/>
                </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({auth, teams, stages, status, situation}) {
    return {auth, teams, stages, status, situation};
}

export default connect(mapStateToProps, actions)(AdminMatchs);