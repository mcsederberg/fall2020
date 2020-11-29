const sql = require("./sql");

function generateUID() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
function SQLDateTime(date){
    if (date == ""){
        return "";
    }
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
};


module.exports = {generateUID: generateUID, SQLDateTime: SQLDateTime};