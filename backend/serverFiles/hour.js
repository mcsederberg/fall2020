const express = require("express")

const router = express.Router();
const server = require("../server.js");


router.post('/clockIn', async(req, res)=> {
	var id = server.data.generateUID();
	var clockedIn = server.data.SQLNow();
	try {
		let queryString = `INSERT INTO hour (hourID, userID, parentID, parentType, clockedIn, clockedOut) VALUES ('${id}', ${req.body.userID}', '${req.body.parentID}', '${req.body.parentType}', '${clockedIn}','NULL'`
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
})
router.put('/clockOut', async(req, res)=> {
	try {
		let queryString = `UPDATE hour SET clockedOut ='${server.data.SQLNow()}', where id = '${req.body.hourID}'`;
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
})

router.get('/getHours/parentID/:parentID/userID/:userID', async(req, res)=> {
	var parentID = req.params.parentID;
	var userID = req.params.userID;
	try{
		var queryString = `SELECT * FROM hour WHERE parentID = '${parentID}' AND userID = '${userID}'`;
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

module.exports = {
	routes: router,
}