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

app.post('/api/login', async (req, res) => {
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	try{
		var queryString = `SELECT * FROM user WHERE username = '${username}'`;
		var successCallback = function(result){
			console.log("Success:");
			console.log(result);
			if (result.length == 0){
				res.send({
					code: "INVALID_USERNAME"
				});
				return;
			}
			var hashedPassword = result[0].password;
			var isPassword = passwordHash.verify(password, hashedPassword); //todo send incorrect password message
			if (!isPassword){
				res.send({
					code: "INCORRECT_PASSWORD"
				});
				return;
			}
			console.log("Result:");
			console.log(result);
			var model = result[0];
			res.send({
				code: "OK",
				model:{
					id: model.id,
					username: model.username,
					password: model.password,
					first: model.first,
					last: model.last
				}
			});
		}
		var errorCallback = function(error){
			res.send(error);
		}
		var response = await query(queryString, successCallback, errorCallback);
	} catch (error){
		res.send(error);
	}
});


app.post('/api/register', async (req, res) => {
	console.log(req.body);
	var first = req.body.firstName;
	var last = req.body.lastName;
	var username = req.body.username;
	var password = req.body.password;
	var hashedPassword = passwordHash.generate(password);
	var id = generateUID();
	try{
		var queryString = `INSERT INTO user (id, username, password, firstname, lastname) VALUES ('${id}', '${username}', '${hashedPassword}', '${first}', '${last}')`;
		var successCallback = function(result){
			res.send({
				code: "OK",
				model:{
					id: id,
					username: username,
					password: password,
					first: first,
					last: last
				}
			});
		}
		var errorCallback = function(error){
			res.send(error);
		}
		query(queryString, successCallback, errorCallback);
	} catch (error){
		console.log("Error in register" + error);
		res.send(500);
	}
});
