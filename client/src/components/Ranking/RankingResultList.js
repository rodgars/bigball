import React from 'react';
import RankingResultItem from './RankingResultItem';

const renderPlayers = () => {
    var rows = [];
    for (var i = 1; i < 35; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<RankingResultItem key={i}
            position={i}
            name="Rodrigo Garcia"
            urlImg="https://avatars0.githubusercontent.com/u/20528688?s=40&v=4"
            total={400}
            grupos={8}
            oitavas={45}
            quartas={20}
            semis={40}
            finais={30}
            sgp={42}
            sgc={-15}
            art={42}
            finalistas={40}
             />);
    }
    return rows;
};

const RankingResultList = (props) => {
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
                                        {renderPlayers()}
                                    </tbody>
                                </table>
    );
};

export default RankingResultList;