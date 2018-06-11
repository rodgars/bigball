import React from 'react';
import {Link} from 'react-router-dom';

const TdItem = (props) => {
    const color = props.value >= 0 ? "positive" : "negative";
    return (
        <td className={color}>{props.value}</td>
    );
};

const GetMedal = (position) =>{
    switch(position){
        case 1:
            return (<img src="/assets/m_gold.png" />);
        case 2:
            return (<img src="/assets/m_silver.png" />);
        case 4:
            return (<img src="/assets/m_bronze.png" />);
    }
};

const RankingResultItem = (props) => {
    return (
        <tr className="center aligned">
            <td>{props.position}°</td>
            <td className="left aligned"><Link to={`/game/${props.id}`}><img src={props.urlImg} /> {props.name}</Link></td>
            <td>{ GetMedal(props.position) }</td>
            <td><strong>{props.total}</strong></td>
            <TdItem value={props.grupos} />
            <TdItem value={props.oitavas} />
            <TdItem value={props.quartas} />
            <TdItem value={props.semis} />
            <TdItem value={props.finais} />
            <TdItem value={props.sgp} />
            <TdItem value={props.sgc} />
            <TdItem value={props.art} />
            <TdItem value={props.finalistas} />
        </tr>
    );
};

export default RankingResultItem;