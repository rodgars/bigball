import React from 'react';
import {Typeahead, Menu, MenuItem} from 'react-bootstrap-typeahead';
import * as utils from '../../utils/filtering';

const AutoCompleteTeam = (props) => {
    if(props.edit){
        return(
            <Typeahead 
                emptyLabel="Resultado não encontrado"
                defaultSelected={ props.pick }
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
        if(props.pick != null && props.pick[0] != null){
            return(
                <div>
                <img className={props.pick[0].flag} src="/assets/flags/blank.gif" /> {props.pick[0].name}
                </div>
            );              
        }else{
            return (
                <div><i>Não informado</i></div>
            );
        }
    }
};

export default AutoCompleteTeam;