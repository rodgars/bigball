import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RankingResultItem from './RankingResultItem';

class RankingResultList extends Component {
    renderPlayers() {
        return _.map(this.props.users, user => {

            let rank = _.find(this.props.ranking, {'_id':user._id});
            if(typeof(rank) === 'undefined'){
                rank = {
                    total: 0,
                    position: 1,
                    groups: 0,
                    eighthFinals: 0,
                    quarterFinals: 0,
                    semiFinals: 0,
                    finals: 0,
                    teamGP: 0,
                    teamGC: 0,
                    topScorer: 0,
                    champions: 0
                };
            }

            return (
                <RankingResultItem key={user._id}
                    position={rank.position}
                    id={user._id}
                    name={user.name}
                    urlImg={user.urlImg.replace("sz=50","sz=40")}
                    total={rank.total}
                    grupos={rank.groups}
                    oitavas={rank.eighthFinals}
                    quartas={rank.quarterFinals}
                    semis={rank.semiFinals}
                    finais={rank.finals}
                    sgp={rank.teamGP}
                    sgc={rank.teamGC}
                    art={rank.topScorer}
                    finalistas={rank.champions}
                 />
            );
        });
    }

    render(){
        try{

            return (
                <table className="ui selectable small compact table">
                    <thead>
                        <tr className="center aligned">
                            <th>#</th>
                            <th className="left aligned">Jogador</th>
                            <th></th>
                            <th>Total</th>
                            <th>Grupos</th>
                            <th>Oitavas</th>
                            <th>Quartas</th>
                            <th>Semis</th>
                            <th>Finais</th>
                            <th>S. GP</th>
                            <th>S. GC</th>
                            <th>Art</th>
                            <th>Finalistas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPlayers()}
                    </tbody>
                </table>
            );
        }catch(err){
            return (<div></div>);
        }
    }
}

function mapStateToProps({ranking, users}){
    return {ranking, users};
}

export default connect(mapStateToProps)(RankingResultList);