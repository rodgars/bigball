import React, {Component} from 'react';
import _ from 'lodash';

class DropDown extends Component {
    renderValues() {
        return _.map(this.props.values, value => {
            return(
                <option key={value.val} value={value.val}>{value.name}</option>
            );
        });
    }

    value(){
        return this.ddlComponent.value;
    }

    render(){
        return (
            <select ref={ddl => this.ddlComponent = ddl} id={this.props.id} name={this.props.id} className="form-control" defaultValue={this.props.selected}>
                <option value="">Selecione um valor</option>
                {this.renderValues()}
            </select>
        );
    }
}

export default DropDown;