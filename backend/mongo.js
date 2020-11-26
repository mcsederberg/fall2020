const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'forklift';

// Create a new MongoClient
const client = new MongoClient(url);

let db;
// Use connect method to connect to the Server
function getDB() {
    return db;
}

client.connect().then(function(mongoConnection) {
  db = mongoConnection.db(dbName);
}).catch(function(err){
	console.log(err);
});

module.exports = getDB;