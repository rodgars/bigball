import React from 'react';
import PointsLabel from '../Utils/PointsLabel';
import AutoCompleteTeam from '../Utils/AutoCompleteTeam';
import AutoCompletePlayer from '../Utils/AutoCompletePlayer';
import _ from 'lodash';

const renderTypeahead = (props) => {
    const picked = props.options.filter(element => {
        return element.id == props.pick;
    });

    if(props.isPlayer){
        return (
            <AutoCompletePlayer
                edit={props.edit}
                pick={picked}
                fieldPlaceholder={props.fieldPlaceholder}
                options={props.options} />
        );
    } else {
        return(
            <AutoCompleteTeam
                edit={props.edit}
                pick={picked}
                fieldPlaceholder={props.fieldPlaceholder}
                options={props.options}
            />);
    }
};

const MyGameFormFactorsItem = (props) => {
    return (
        <tr>
            <td width="30%">{props.field}</td>
            <td width="60%">
                {renderTypeahead(props)}
            </td>
            <td><PointsLabel value={props.points} /></td>
        </tr>
    );
};

export default MyGameFormFactorsItem;