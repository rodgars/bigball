import React, {Component} from 'react';
import {Typeahead, Menu, MenuItem} from 'react-bootstrap-typeahead';
import * as utils from '../../utils/filtering';

class AutoCompleteTeam extends Component {
    constructor(props){
        super(props);

        this.state = { inputValue: "" };
    }

    value(){
        return this.state.inputValue;
    }

    render(){
        if(this.props.edit){
            return(
                <Typeahead
                    onChange={(selected => this.setState({inputValue:selected}))} 
                    emptyLabel="Resultado não encontrado"
                    defaultSelected={ this.props.pick }
                    placeholder={this.props.fieldPlaceholder}
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
                    options={this.props.options} />
            );
        }else{
            if(this.props.pick != null && this.props.pick[0] != null){
                return(
                    <div>
                    <img className={this.props.pick[0].flag} src="/assets/flags/blank.gif" /> {this.props.pick[0].name}
                    </div>
                );              
            }else{
                return (
                    <div><i>Não informado</i></div>
                );
            }
        }
    }
}

export default AutoCompleteTeam;