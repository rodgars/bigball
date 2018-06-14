import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import {Modal} from 'react-bootstrap';

const checkPlayer = (topScorer) => {
    return typeof(topScorer) != 'undefined' && typeof(topScorer._id) != 'undefined';
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

    selectTopScore(player,e){
        e.preventDefault();
        const topscorer = player;

        this.setState({topscorer});
    }

    handleHide() {
        this.setState({ topscorer: {} });
    }

    saveTopScore(topscorer){
        topscorer.goals = this.txtGoals.value;

        this.props.savePlayer(topscorer);
        
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

            return (
                <tr key={player._id} onClick={this.selectTopScore.bind(this, player)}>
                    <td>{player._id}</td>
                    <td>{player.name}</td>
                    <td>{player.goals}</td>
                    <td></td>
                    <td></td>
                </tr>
            );
        });
    }

    renderModal(){
        if(checkPlayer(this.state.topscorer)){
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
                                <tr><td>ID</td><td>{this.state.topscorer._id}</td></tr>
                                <tr><td>Nome</td><td>{this.state.topscorer.name}</td></tr>
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