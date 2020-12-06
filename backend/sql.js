// const mysql = require('mysql');
// var connection;

// function initializeDatabase() {
//     return new Promise(function(resolve, reject) {
//         connection = mysql.createConnection({
//             host: '34.71.2.189',
//             user: 'forklift',
//             password: 'tomato',
//             database: 'forklift'
//         });

//         connection.connect(function(err){
//             if (err){
//                 console.log("Couldn't connect: " + err);
//                 reject(err);
//             }
//             console.log("connected to database");
//             resolve();
//         });
        
//         connection.on('error', function(err) {
//             console.log('db error', err);
//             if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
//                 initializeDatabase();   
//             } else {         
//                 reject(err);                                 
//             }
//         });
//     })
// }

// async function query(sql, successCallback, errorCallback){ //TODO move these to a shared location
//     connection.query(sql, function (err, result) {
//         if (err){ 
//             errorCallback(err);
//         } else {
//             successCallback(result);
//         }
//     });
// };

// module.exports = {query: query, initializeDatabase: initializeDatabase};