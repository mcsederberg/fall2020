const express = require("express")

const router = express.Router();
const server = require("../server.js");

router.post('/create', async(req, res) => {
	let id = server.data.generateUID();
	let parentType = req.body.parentType ? req.body.parentType : "project";
	try {
		let queryString = `INSERT INTO hour (hourID, userID, parentID, parentType, time) VALUES ('${id}', ${req.body.userID}', '${req.body.parentID}', '${parentType}', '0'`
		server.data.query(queryString, 
			function(result){
				res.send({
					code: "OK",
					model: {
						id: id,
						userID: req.body.userID,
						parentID: req.body.parentID,
						parentType: req.body.parentType,
						time: req.body.time
					}
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.put('/updateTime', async(req, res) => {
	try {
		let queryString = `UPDATE hour SET time = '${req.body.time}' WHERE hourID = '${req.body.id}'`
		server.data.query(queryString, 
			function(result){
				res.send({
					code: "OK",
					model: {
						time: req.body.time
					} 
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

//get time for a user for a task or project
router.get('/getTime/user/:userID/id/:id', async(req, res) => {
	try {
		let queryString = `SELECT * FROM hour WHERE userID = '${userID}' AND parentID = '${id}'`
		server.data.query(queryString, 
			function(result){
				if (result.length == 0) {
					res.send({
						code: "NO_TIME"
					})
					return;
				}
				res.send({
					code: "OK",
					hours: result
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

//get times for all users for a project or a task
router.get('/getTime/projectTask/:id', async(req, res) => {
	try {
		let queryString = `SELECT * FROM hour WHERE parentID = '${id}'`
		server.data.query(queryString, 
			function(result){
				if (result.length == 0) {
					res.send({
						code: "NO_TIME"
					})
					return;
				}
				res.send({
					code: "OK",
					hours: result
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

module.exports = {
	routes: router,
}