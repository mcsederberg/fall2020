const { query } = require("express");
const express = require("express")

const router = express.Router();
const server = require("../server.js");


router.post('/clockIn', async(req, res)=> {
	//Make sure we're not already clocked in
	try {
		let queryString = `SELECT * FROM hour WHERE userID ='${req.body.userID}' AND parentID ='${req.body.parentID}' AND clockedOut IS NULL`;
		server.data.query(queryString, function(result){
			if (result.length != 0){
				res.send({
					code: "ALREADY_CLOCKED_IN"
				});
				return;
			}
			//Now clock in logic
			var id = server.data.generateUID();
			var clockedIn = server.data.SQLNow();
			try {
				let queryString = `INSERT INTO hour (hourID, userID, parentID, parentType, clockedIn, clockedOut) VALUES ('${id}', '${req.body.userID}', '${req.body.parentID}', '${req.body.parentType}', '${clockedIn}', NULL)`
				server.data.query(queryString, 
					function(result){
						res.send({
							code: "OK",
							model: {
								id: id,
								userID: req.body.useID,
								parentID: req.body.parentID,
								parentType: req.body.parentType,
								clockedIn: clockedIn,
								clockedOut: null
							}
					})
				}, function(error){
					res.send(error);
				})
			} catch (error){
				res.send(error);
			}

		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})
router.put('/clockOut', async(req, res)=> {
	//Make sure we're not already clocked in
	try {
		let queryString = `SELECT * FROM hour WHERE userID ='${req.body.userID}' AND parentID ='${req.body.parentID}' AND clockedOut IS NULL`;
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "ALREADY_CLOCKED_OUT"
				});
				return;
			}
			try {
				let queryString = `UPDATE hour SET clockedOut ='${server.data.SQLNow()}' WHERE parentID = '${req.body.parentID}' AND userID = '${req.body.userID}' AND clockedOut IS NULL`;
				server.data.query(queryString, 
					function(result){
						res.send({
							code: "OK",
							model: {
								
							}
					})
				}, function(error){
					res.send(error);
				})
			} catch (error){
				res.send(error);
			}
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.get('/getHours/userID/:userID/parentID/:parentID', async(req, res)=> {
	var parentID = req.params.parentID;
	var userID = req.params.userID;
	try{
		var queryString = `SELECT * FROM hour WHERE parentID = '${parentID}' AND userID = '${userID}'`;
		console.log(queryString);
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "NO_HOURS"
				});
				return;
			}
			res.send({
				code: "OK",
				hours: result
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.get('/getClockedIn/parentID/:parentID/userID/:userID', async(req, res)=> {
	try{
		var queryString = `SELECT * FROM hour WHERE parentID = '${req.params.parentID}' AND userID = '${req.params.userID}' AND clockedOut IS NULL`;
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "OK",
					clockedIn: false
				});
				return;
			}
			res.send({
				code: "OK",
				clockedIn: true
			});
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
router.get('/getTime/userID/:userID/parentID/:parentID', async(req, res) => {
	try {
		let queryString = `SELECT * FROM hour WHERE userID = '${req.params.userID}' AND parentID = '${req.params.parentID}'`
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