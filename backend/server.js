const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public'));

const mysql = require('mysql');

var connection = mysql.createConnection({
	host: '34.71.2.189',
	user: 'forklift',
	password: 'tomato'
});

connection.connect(function(err){
	if (err){
		console.log("Couldn't connect: " + err);
		throw err;
	} 
	console.log("connected to database");
	app.listen(3000, () => console.log('Server listening on port 3000!!'));
});




