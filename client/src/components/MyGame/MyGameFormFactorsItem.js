import React, {Component} from 'react';
import PointsLabel from '../Utils/PointsLabel';
import AutoCompleteTeam from '../Utils/AutoCompleteTeam';
import AutoCompletePlayer from '../Utils/AutoCompletePlayer';
import _ from 'lodash';

class MyGameFormFactorsItem extends Component {
    value(){
        if(this.props.isPlayer) return this.txtPlayer.value();
        else return this.txtTeam.value();
    }

    renderTypeahead() {
        const picked = this.props.options.filter(element => {
            return element.id == this.props.pick;
        });
    
        if(this.props.isPlayer){
            return (
                <AutoCompletePlayer
                    ref={el => this.txtPlayer = el}
                    edit={this.props.edit}
                    pick={picked}
                    fieldPlaceholder={this.props.fieldPlaceholder}
                    optionsCountries={this.props.optionsCountries}
                    options={this.props.options} />
            );
        } else {
            return(
                <AutoCompleteTeam
                    ref={el => this.txtTeam = el}
                    edit={this.props.edit}
                    pick={picked}
                    fieldPlaceholder={this.props.fieldPlaceholder}
                    options={this.props.options}
                />);
        }
    }
    
    render(){
        return (
            <tr>
                <td width="30%">{this.props.field}</td>
                <td width="60%">
                    {this.renderTypeahead()}
                </td>
                <td><PointsLabel value={this.props.points} /></td>
            </tr>
        );
    }
}

MyGameFormFactorsItem.defaultProps = {
    isPlayer: false
};

export default MyGameFormFactorsItem;