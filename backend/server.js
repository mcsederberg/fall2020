const express = require('express');
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');
const app = express();
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public'));

const mysql = require('mysql');

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

var query = async function(sql, successCallback, errorCallback){
	connection.query(sql, function (err, result) {
		if (err){ 
			errorCallback(err);
		} else {
			successCallback(result);
		}
	});
}
var generateUID = function() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.post('/api/login/username/:username/password/:password', async (req, res) => {
	var username = req.params.username;
	var password = req.params.password;
	try{
		var queryString = `SELECT * FROM user WHERE username = '${username}'`;
		var successCallback = function(result){
			var hashedPassword = result[0].password;
			var isPassword = passwordHash.verify(password, hashedPassword); //todo send incorrect password message
			res.sendStatus(200); //todo maybe return user object?
		}
		var errorCallback = function(error){
			res.sendStatus(500);
		}
		var response = await query(queryString, successCallback, errorCallback);
	} catch (error){
		res.sendStatus(500);
	}
});

app.post('/api/register/name/:name/username/:username/password/:password', async (req, res) => {
	var name = req.params.name;
	var username = req.params.username;
	var password = req.params.password;
	var hashedPassword = passwordHash.generate(password);
	var id = generateUID();
	try{
		var queryString = `INSERT INTO user (id, username, password, name) VALUES ('${id}', '${username}', '${hashedPassword}', '${name}')`;
		var successCallback = function(result){
			
			res.sendStatus(200);
		}
		var errorCallback = function(error){
			res.sendStatus(500);
		}
		var response = await query(queryString, successCallback, errorCallback)
		// res.sendStatus(200);
	} catch (error){
		console.log("Error in register" + error);
		res.sendStatus(500);
	}
});
