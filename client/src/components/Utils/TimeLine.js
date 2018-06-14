import React from 'react';
import _ from 'lodash';
import * as dates from '../../utils/date';

const renderSteps = (stages) => {
    return _.map(stages, stage => {
        let status = "";
        let icon = "";
        let stageName = stage.label;
        let stageStatus = "";
        let stageSituation = stage.situation;

        let date = dates.getDateTime(stage.deadline);

        switch(stageSituation){
            case "Estamos aqui":
                icon = "hand point down";
                status = "active";
                break;
            case "Fase finalizada":
                icon = "check";
                status = "disabled";
                break;
            case "Fase não iniciada":
                icon = "ban";
                status = "disabled";
                break;
        }

        switch(stage.status){
            case "opened":
                stageStatus = `Envio até ${date}`;
                break;
            case "completed":
                stageStatus = "Envio encerrado";
                break;
            case "closed":
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