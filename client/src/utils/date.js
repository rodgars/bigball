export const getDateTime = (date) => {
    let arr = date.split(" ");
    let dt = arr[0];
    let tm = arr[1];

    let arr2 = dt.split("-");
    let year = arr2[0];
    let month = arr2[1];
    let day = arr2[2];

    let arr3 = tm.split(":");
    let hour = arr3[0];
    let minute = arr3[1];

    return `${day}/${getMonth(month)} ${hour}:${minute}`;
};

export const getDate = (date) => {
    let arr = date.split(" ");
    let dt = arr[0];
    let tm = arr[1];

    let arr2 = dt.split("-");
    let year = arr2[0];
    let month = arr2[1];
    let day = arr2[2];

    return `${day}/${getMonth(month)}`;
};

const getMonth = (month) => {
    switch(month){
        case "01":
            month = "jan";
            break;
        case "02":
            month = "fev";
            break;
        case "03":
            month = "mar";
            break;
        case "04":
            month = "abr";
            break;
        case "05":
            month = "mai";
            break;
        case "06":
            month = "jun";
            break;
        case "07":
            month = "jul";
            break;
        case "08":
            month = "ago";
            break;
        case "09":
            month = "set";
            break;
        case "10":
            month = "out";
            break;
        case "11":
            month = "nov";
            break;
        case "12":
            month = "dez";
            break;
    }
    return month;
};