import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import {Modal} from 'react-bootstrap';

const checkPlayer = (topScorer) => {
    return typeof(topScorer) != 'undefined' && typeof(topScorer.player) != 'undefined';
};

const getPlayerInfo = (id, players) => {
    let playerFound = _.find(players, {"id":id});
    if(typeof(playerFound) === 'undefined') playerFound = {name:""};
    return playerFound;
};

class AdminPlayers extends Component {
    constructor(props){
        super(props);

        this.handleHide = this.handleHide.bind(this);
        this.selectTopScore= this.selectTopScore.bind(this);

        this.state = {topscorer:{}};
    }

    componentDidMount(){
        this.props.fetchTopScorer();
    }

    selectTopScore(id,e){
        e.preventDefault();

        const player = _.find(this.props.players, {_id:id});
        const topscorer = _.find(this.props.topscorer, {player:id});

        this.setState({topscorer});
    }

    handleHide() {
        this.setState({ topscorer: {} });
    }

    saveTopScore(topscorer){
        topscorer.goals = this.txtGoals.value;

        this.props.saveTopScorer(topscorer);
        
        this.props.fetchTopScorer();
        this.handleHide();
        alert("Artilheiro atualizado!");
    }

    onChangeScore(value){
        let stateToChange = this.state.topscorer;
        
        stateToChange.goals = value;

        this.setState({topscorer: stateToChange});
    }

    renderTopScorer(){
        return _.map(this.props.topscorer, player => {

            let playerFound = getPlayerInfo(player.player, this.props.players);

            return (
                <tr key={player.player} onClick={this.selectTopScore.bind(this, player.player)}>
                    <td>{player.player}</td>
                    <td><img src="./assets/flags/blank.gif" className={playerFound.flag} /> {playerFound.name}</td>
                    <td>{player.goals}</td>
                    <td></td>
                    <td></td>
                </tr>
            );
        });
    }

    renderModal(){
        if(checkPlayer(this.state.topscorer)){
            let player = getPlayerInfo(this.state.topscorer.player, this.props.players);
            return (
                <Modal
                    {...this.props}
                    show={checkPlayer(this.state.topscorer)}
                    onHide={this.handleHide}
                    dialogClassName="custom-modal"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                        <i className="icon user"></i>Atualizar Artilheiro
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="ui small compact definition table">
                            <tbody>
                                <tr><td>ID</td><td>{this.state.topscorer.player}</td></tr>
                                <tr><td>Nome</td><td><img src="./assets/flags/blank.gif" className={player.flag} />{player.name}</td></tr>
                                <tr>
                                    <td>Goals</td>
                                    <td>
                                    <input onInput={e => this.onChangeScore(e.target.value)} ref={input => {this.txtGoals = input}} style={{width:"80px"}} type="number" min={0} defaultValue={this.state.topscorer.goals} className="ui input" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="ui blue button" onClick={this.saveTopScore.bind(this, this.state.topscorer)}><i className="ui icon save"></i>Salvar</button>
                    </Modal.Body>
                </Modal>
            );
        }else{
            return (<div></div>);
        }        
    }

    render(){
        try{
            return (
                <div>
                <br/><br/>
                <table className="ui compact small table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Gols</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTopScorer()}
                    </tbody>
                </table>
                <br/><br/>
                {this.renderModal()}
                </div>
            );
        }catch(err){
            return(<div>{err}</div>);
        }
    }
}

function mapStateToProps({topscorer, players}){
    return {topscorer, players};
}

export default connect(mapStateToProps,actions)(AdminPlayers);