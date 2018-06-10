import _ from 'lodash';

export const dataValues = (values) => {
    let arr = [];
    _.map(values, value => {
        arr.push({val:value,name:value});
    });
    return arr;
};

export const dataTeams = (teams) => {
    let arr = [];
    _.map(teams, team => {
        arr.push({val:team.id,name:team.name});
    });
    return arr;
};

export const dataWinner = (teams, guess) => {
    return _.filter(dataTeams(teams), team => {
        return team.val == guess.homeTeam || team.val == guess.visitorTeam
    });
};