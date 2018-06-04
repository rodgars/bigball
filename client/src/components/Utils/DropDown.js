import React from 'react';
import _ from 'lodash';

const RenderValues = (values) => {
    return _.map(values, value => {
        return(
            <option value={value.val}>{value.name}</option>
        );
    });
};

const DropDown = (props) => {
    return (
        <select value={props.selected}>
            <option value="">Selecione um valor</option>
            {RenderValues(props.values)}
        </select>
    );
};

export default DropDown;