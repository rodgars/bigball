import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import DropDown from '../Utils/DropDown';

const situation = [{name:"Fase Não Liberada",val:"1"},
        {name:"Estamos Aqui",val:"2"},
        {name:"Fase Finalizada",val:"3"}];

const locked = [{name:"Sim",val:true},{name:"Não",val:false}];

class AdminMatchs extends Component {
    constructor(props){
        super(props);

        this.state = {
            games: {},
        };
    }

    selectedStageId(id,e){
        e.preventDefault();
        this.setState((state) => {
            return {games:this.props.worldCup[id]};
        });
    }

    RenderStages(){
        return _.map(this.props.worldCup, stage => {
            return(
            <tr key={stage._id}>
                <td></td>
                <td><a href="#" onClick={this.selectedStageId.bind(this, stage._id)}>{stage._id}</a></td>
                <td>{stage.deadline}</td>
                <td>
                    <DropDown key={`${stage._id}_sit`} values={situation} selected={stage.situation} />
                </td>
                <td>
                    <DropDown key={`${stage._id}_loc`} values={locked} selected={stage.locked} />
                </td>
                <td><button key={`${stage._id}_btn`} className="ui icon blue button"><i className="save icon"></i></button></td>
            </tr>
            );
        });
    }

    RenderGames(){
        if(this.state.games._id == null){
            return (
                <tr><td colSpan="8">Nenhuma fase selecionada</td></tr>
            );
        }else{
            const teams = _.map(this.props.teams, team => {
                return {name:team.name,val:team.id};
            });

            return _.map(_.orderBy(this.state.games.matches,["date"],["ASC"]), match => {
                return(
                    <tr>
                        <td>{match._id}</td>
                        <td>{match.group}</td>
                        <td>{match.date}</td>
                        <td>
                            <DropDown key={`${match._id}_ddlHome`} values={teams} selected={match.homeTeam._id} />
                        </td>
                        <td></td>
                        <td>{match.visitorTeam.name}</td>
                        <td></td>
                    </tr>
                    );
                });
        }
    }

    render(){
        return (
            <div>
            <br />
            <div className="ui segment">
                <p><b>Jogos</b></p>
                <hr />
                <h5>Fases:</h5>
                <table className="ui collapsing selectable compact small table">
                    <thead>
                        <tr>
                            <th>Ordem</th>
                            <th>Nome da Fase</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Ativa?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.RenderStages()}
                    </tbody>
                </table>
                <hr />
                <hr />
                <h5>Jogos:</h5>
                <table className="ui collapsing compact small table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Grupo</th>
                            <th>Data</th>
                            <th>Casa</th>
                            <th>Gols Casa</th>
                            <th>Visitante</th>
                            <th>Gols Visitante</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.RenderGames()}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

function mapStateToProps({worldCup,auth,teams}) {
    return {worldCup,auth,teams};
}

export default connect(mapStateToProps)(AdminMatchs);