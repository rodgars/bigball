export const filterPlayerByCountry = (idCountry, players) => {
    if (idCountry == "") return players;

    return players.filter(el => {
        return el.team == idCountry;
    });
};

export const filterCountry = (idCountry, countries) => {
    return countries.filter(el => {
        return el.id == idCountry;
    })
};

export const filterPlayer = (idPlayer, players) => {
    return players.filter(el => {
        return el.id == idPlayer;
    })
};