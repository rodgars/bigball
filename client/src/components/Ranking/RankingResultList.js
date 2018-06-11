import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RankingResultItem from './RankingResultItem';

class RankingResultList extends Component {
    renderPlayers() {

        return _.map(this.props.users, user => {
            return (
                <RankingResultItem key={user._id}
                    position={0}
                    name={user.name}
                    urlImg={user.urlImg.replace("sz=50","sz=40")}
                    total={0}
                    grupos={0}
                    oitavas={0}
                    quartas={0}
                    semis={0}
                    finais={0}
                    sgp={0}
                    sgc={0}
                    art={0}
                    finalistas={0}
                 />
            );
        });
    }

    render(){
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
    }
}

function mapStateToProps({users}){
    return {users};
}

export default connect(mapStateToProps)(RankingResultList);