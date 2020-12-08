
const { query } = require("express");
const express = require("express")
const passwordHash = require('password-hash');
const router = express.Router();
const helper = require("../helper");
const mongo = require("../mongo");

router.post('/login', async (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	mongo.getDB().collection("user").findOne({ username: username})
		.then(result => {
			var hashedPassword = result.password;
			var isPassword = passwordHash.verify(password, hashedPassword);
			if (!isPassword){
				res.send({
					code: "INCORRECT_PASSWORD"
				});
				return;
			}
			var model = result;
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
		}).catch(err => res.send(err));
});


router.post('/register', async (req, res) => {
	var first = req.body.firstName;
	var last = req.body.lastName;
	var username = req.body.username;
	var password = req.body.password;
	var hashedPassword = passwordHash.generate(password);
	var id = helper.generateUID();
	mongo.getDB().collection("user").insertOne({id: id, username: username, password: hashedPassword, firstName: first, lastName: last})
		.then(result => res.send({
			code: "OK",
			model: {
				id: id,
				username: username,
				password: password,
				first: first,
				last: last
			}
		}))
		.catch(err => res.send(err));
});

router.get("/getUsersForProject/:projectID", async(req, res)=>{
	var projectID = req.params.projectID;
	mongo.getDB().collection("project").findOne({ projectID: projectID})
		.then(project => {
			var users = project.users;
			mongo.getDB().collection("user").find({id: {$in: users}}).toArray(function(e, result){
				res.send({
					code: "OK",
					users: result
				});
			})
		})
		.catch(err => res.send(err));
});

module.exports = {
	routes: router,
}