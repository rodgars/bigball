import React from 'react';
import _ from 'lodash';

const renderSteps = (stages) => {
    return _.map(stages, stage => {
        let status = stage.status == "opened" ? "active" : "disabled";
        let icon = "";
        let stageName = stage.label;
        let stageStatus = "";
        let stageSituation = stage.situation;

        switch(stage.status){
            case "opened":
                icon = "hand point down";
                stageStatus = `Envio até ${stage.deadline}`;
                break;
            case "completed":
                icon = "check";
                stageStatus = "Envio encerrado";
                break;
            case "closed":
                icon = "ban";
                stageStatus = "Envio não disponível";
                break;
        }

        return (
            <div key={stage._id} className={`${status} step`}>
                <i className={`${icon} icon`}></i>
                <div className="content">
                    <div className="title">{stageName}</div>
                    <div className="description">{stageSituation}.<br />{stageStatus}</div>
                </div>
            </div>
        );
    });
};

const TimeLine = (props) => {
    let stages = _.orderBy(props.stages, ["order"], ["ASC"]);

    return (
        <div className="ui fluid steps">
            {renderSteps(stages)}   
        </div>
    );
};

export default TimeLine;