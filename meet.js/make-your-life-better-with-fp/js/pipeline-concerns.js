/* module 2, concern-related */
function validateData(data) {
    console.log("Validating data: " + data + "$");
    return data;
}

function logState(data) {
    console.log("Logging state: " + data + "$");
    return data;
}

function notifyBusinessPeople(data) {
    console.log("Notifying business people: " + data + "$");
    return data;
}

function informAboutResults(data) {
    console.log("Computed result: " + data + "$");
    return data;
}

function saveToDatabase(data) {
    console.log("Saving to database: " + data + "$");
    return data;
}

function hijackCustomerInfo(data){
    console.log("Hijacking customer info: " + data + "$");
    return data;
}

function skimSomeDollars(data) {
    var newData = parseInt(data * .8, 10); 
    console.log("Skimming some dollars: " + newData + "$ (" + (data - newData) + "$ skimmed)");
    return newData;
}