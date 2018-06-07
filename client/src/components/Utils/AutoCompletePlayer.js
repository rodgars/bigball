import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Typeahead, Menu, MenuItem} from 'react-bootstrap-typeahead';
import * as utils from '../../utils/filtering';

class AutoCompletePlayer extends Component {
    constructor(props){
        super(props);

        let picked = 
            (typeof(this.props.pick) != 'undefined' 
            && this.props.pick.length > 0) 
                ? this.props.pick[0] 
                : {team:"",id:""};

        this.state = {
            player: {
                selectedTeam: picked.team,
                selectedPlayer: picked.id,
                PlayerList: utils.filterPlayerByCountry(picked.team, this.props.players)
            }
        };
    }

    filter = (select) => {
        if(typeof(select) != 'undefined' && select.length == 1)
            this.setState(
                {
                    player: {
                        selectedTeam: select[0].id || "",
                        selectedPlayer: this.state.player.selectedPlayer,
                        PlayerList: utils.filterPlayerByCountry(select[0].id, this.props.players)
                    }
                }
            );
    }

    renderPlayer(){
        if(this.state.player.selectedTeam != ""){
            return (
                <div>
                <p>Escolha o jogador aqui:</p>
                <Typeahead 
                emptyLabel="Resultado não encontrado"
                defaultSelected={utils.filterPlayer(this.state.player.selectedPlayer,this.props.players)}
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
                options={this.state.player.PlayerList} />
                </div>
            );
        }
    }

    render(){
        if(this.props.edit){
            return(
            <div className="ui segment">
            <p>Filtro por país:</p>
            <Typeahead 
            onChange={this.filter}
            defaultSelected={utils.filterCountry(this.state.player.selectedTeam, this.props.teams)}
            emptyLabel="Resultado não encontrado"
            placeholder="Selecione o país para filtrar"
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
            options={this.props.teams} /><br />
            {this.renderPlayer()}            
            </div>);
        }else{
            if(this.props.pick != ""){
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

function mapStateToProps({teams, players}){
    return {teams, players};
}

export default connect(mapStateToProps)(AutoCompletePlayer);