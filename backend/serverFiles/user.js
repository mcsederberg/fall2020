
const express = require("express")
const passwordHash = require('password-hash');
const router = express.Router();
const server = require("../server.js");

router.post('/login', async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	try{
		var queryString = `SELECT * FROM user WHERE username = '${username}'`;
		var successCallback = function(result){
			// console.log("Success:");
			// console.log(result);
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
			// console.log("Result:");
			// console.log(result);
			var model = result[0];
			res.send({
				code: "OK",
				model:{
					id: model.id,
					username: model.username,
					password: model.password,
					firstName: model.firstName,
					lastName: model.lastName
				}
			});
		}
		var errorCallback = function(error){
			res.send(error);
		}
		var response = await server.data.query(queryString, successCallback, errorCallback);
	} catch (error){
		res.send(error);
	}
});


router.post('/register', async (req, res) => {
	console.log(req.body);
	var first = req.body.firstName;
	var last = req.body.lastName;
	var username = req.body.username;
	var password = req.body.password;
	var hashedPassword = passwordHash.generate(password);
	var id = server.data.generateUID();
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
		server.data.query(queryString, successCallback, errorCallback);
	} catch (error){
		console.log("Error in register" + error);
		res.send(error);
	}
});

module.exports = {
	routes: router,
}