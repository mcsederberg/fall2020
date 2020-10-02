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
const { time } = require('console');

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

//PROJECT
app.post('/api/createProject', async (req, res) => {
	console.log(req.body);
	var title = req.body.title;
	var summary = req.body.summary;
	var ownerID = req.body.ownerID; //will we have this information or will we need to fetch it?
	var deleted = false; //should this be something else like a 0 or 1?
	var id = generateUID();
	try{
		var queryString = `INSERT INTO project (id, title, summary, ownerID, deleted) VALUES ('${id}', '${title}', '${summary}', '${ownerID}', '${deleted}')`;
		var successCallback = function(result){
			res.send({
				code: "OK",
				model:{
					id: id,
					title: title,
					summary: summary,
					ownerID: ownerID,
					deleted: deleted //should this be returned in the object?
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
})

app.get('/api/project/:id', async (req, res) => {
	try{
		var queryString = `SELECT * FROM project WHERE id = '${req.params.id}'`;
		var successCallback = function(result){
			console.log("Success:");
			console.log(result);
			if (result.length == 0){
				res.send({
					code: "INVALID_ID"
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
					title: model.title,
					summary: model.summary,
					ownerID: model.ownerID,
					deleted: model.deleted //should this be returned in the object?
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
})

//MESSAGE
app.post('/api/createMessage', async (req, res) => {
	console.log(req.body);
	var projectID = req.body.projectID;
	var userID = req.body.userID; //will we have this information or will we need to fetch it?
	var content = req.body.content;
	var timePublished = Date.now; //not sure this will work
	var editDate = Date.now;
	var priority = req.body.priority;
	var deleted = false; 
	var id = generateUID();
	try{
		var queryString = `INSERT INTO message (id, projectID, userID, content, timePublished, editDate, priority, deleted) VALUES ('${id}', '${projectID}', '${userID}', '${content}', '${timePublished}', '${editDate}', '${priority}', '${deleted}')`;
		var successCallback = function(result){
			res.send({
				code: "OK",
				model:{
					id: id,
					projectID: projectID,
					userID: userID,
					content: content,
					timePublished: timePublished,
					editDate: editDate,
					priority: priority,
					deleted: deleted //should this be returned in the object?
				}
			});
		}
		var errorCallback = function(error){
			res.send(error);
		}
		query(queryString, successCallback, errorCallback);
	} catch (error){
		console.log("Error in creating project " + error);
		res.send(500);
	}
})

app.get('/api/message/:id', async (req, res) => {
	try{
		var queryString = `SELECT * FROM message WHERE id = '${req.params.id}'`;
		var successCallback = function(result){
			console.log("Success:");
			console.log(result);
			if (result.length == 0){
				res.send({
					code: "INVALID_ID"
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
					projectID: model.projectID,
					userID: model.userID,
					content: model.content,
					timePublished: model.timePublished,
					editDate: model.editDate,
					priority: model.priority,
					deleted: model.deleted
				}
			});
		}
		var errorCallback = function(error){
			res.send(error);
		}
		var response = await query(queryString, successCallback, errorCallback); //is this necessary?
	} catch (error){
		res.send(error);
	}
})