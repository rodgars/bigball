import React from 'react';

const checkColor = (value) => {
    if(value < 0) return "ui red label";
    else if(value == 0) return "ui grey label";
    else return "ui blue label";
}

const PointsLabel = (props) => {
    return (
        <span className={checkColor(props.value)}>{props.value} pts</span>
    );
};

export default PointsLabel;