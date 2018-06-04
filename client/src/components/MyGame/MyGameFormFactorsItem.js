import React from 'react';
import PointsLabel from '../Utils/PointsLabel';
import {Typeahead, Menu, MenuItem} from 'react-bootstrap-typeahead';
import _ from 'lodash';

const renderOficialResult = (result) => {
    if(!result) return <i>N / A</i>;
    return result;
};

const renderTypeahead = (props) => {
    const picked = props.options.filter(element => {
        if(props.isPlayer) return element.name == props.pick;
        else return element.id == props.pick;
    });

    if(props.edit){
        return(
            <Typeahead 
                emptyLabel="Resultado não encontrado"
                defaultSelected={picked}
                placeholder={props.fieldPlaceholder}
                labelKey={option => option.name} 
                renderMenu={(results, menuProps) => (
                    <Menu {...menuProps}>
                        {results.map((result, index) => (
                            <MenuItem option={result} position={index}>
                                <img className={result.flag} src="/assets/flags/blank.gif" /> {result.name}
                            </MenuItem>
                        ))}
                    </Menu>
                )}
                options={props.options} />
        );
    }else{
        if(picked != null && picked[0] != null){
            return(
                <div>
                <img className={picked[0].flag} src="/assets/flags/blank.gif" /> {picked[0].name}
                </div>
            );              
        }else{
            return (
                <div><i>Não informado</i></div>
            );
        }
    }
};

const MyGameFormFactorsItem = (props) => {
    return (
        <tr>
            <td className="active">{props.field}</td>
            <td>
                {renderTypeahead(props)}
                
            </td>
            <td>{renderOficialResult(props.result)}</td>
            <td><PointsLabel value={props.points} /></td>
        </tr>
    );
};

export default MyGameFormFactorsItem;