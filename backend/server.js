const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
const mysql = require('mysql');
const { time } = require('console');

const user = require("./serverFiles/user.js");
app.use("/api/user", user.routes);

const task = require("./serverFiles/task.js");
app.use("/api/task", task.routes);

const hour = require("./serverFiles/hour.js");
app.use('/api/hour', hour.routes);

const message = require("./serverFiles/message.js");
app.use('/api/hour', message.routes);

const project = require("./serverFiles/project.js");
app.use('/api/hour', project.routes);

var connection = mysql.createConnection({
	host: '34.71.2.189',
	user: 'forklift',
	password: 'tomato',
	database: 'forklift'
});

connection.connect(function(err){
	if (err){
		console.log("Couldn't connect: " + err);
		throw err;
	} 
	console.log("connected to database");
	app.listen(3000, () => console.log('Server listening on port 3000!!'));
});

var methods = {
	async query(sql, successCallback, errorCallback){ //TODO move these to a shared location
		connection.query(sql, function (err, result) {
			if (err){ 
				errorCallback(err);
			} else {
				successCallback(result);
			}
		});
	},
	generateUID: function() {
		return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}