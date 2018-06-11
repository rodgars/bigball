import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import {Modal} from 'react-bootstrap';

const checkPlayer = (topScorer) => {
    return typeof(topScorer.player) != 'undefined';
};

class AdminPlayers extends Component {
    constructor(props){
        super(props);

        this.handleHide = this.handleHide.bind(this);
        this.selectTopScore= this.selectTopScore.bind(this);

        this.state = {topScorer:{}};
    }

    componentDidMount(){
        this.props.fetchTopScorer();
    }

    selectTopScore(id,e){
        e.preventDefault();

        const player = _.find(this.props.players, {_id:id});
        const topScorer = _.find(this.props.topScorer, {player:player});

        this.setState({topScorer});
    }

    handleHide() {
        this.setState({ topScorer: {} });
    }

    saveTopScore(topScorer){
        topScorer.goals = this.txtGoals.value;

        this.props.saveTopScorer(topScorer);
        
        this.props.fetchTopScorer();
        this.handleHide();
        alert("Artilheiro atualizado!");
    }

    onChangeScore(value){
        let stateToChange = this.state.topScorer;
        
        stateToChange.goals = value;

        this.setState({topScorer: stateToChange});
    }

    renderTopScorer(){
        return _.map(this.props.topscorer, player => {
            return (
                <tr key={player.player._id}>
                    <td>{player.player._id}</td>
                    <td>{player.player.name}</td>
                    <td>{player.goals}</td>
                    <td></td>
                    <td></td>
                </tr>
            );
        });
    }

    renderModal(){
        if(checkPlayer(this.state.topScorer)){
            return (
                <Modal
                    {...this.props}
                    show={checkPlayer(this.state.topScorer)}
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
                                <tr><td>ID</td><td>{this.state.user.name}</td></tr>
                                <tr><td>Nome</td><td>{this.state.user.date}</td></tr>
                                <tr>
                                    <td>Pagou?</td>
                                    <td>
                                    <input onInput={e => this.onChangeScore(e.target.value)} ref={input => {this.txtGoals = input}} style={{width:"80px"}} type="number" min={0} value={this.state.topScorer.goals} className="ui input" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="ui blue button" onClick={this.saveTopScore.bind(this, this.state.topScorer)}><i className="ui icon save"></i>Salvar</button>
                    </Modal.Body>
                </Modal>
            );
        }else{
            return (<div></div>);
        }        
    }

    render(){
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
    }
}

function mapStateToProps({topscorer, players}){
    return {topscorer, players};
}

export default connect(mapStateToProps,actions)(AdminPlayers);