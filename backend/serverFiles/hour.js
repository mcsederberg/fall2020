const { query } = require("express");
const express = require("express")
const router = express.Router();
const helper = require("../helper");
const mongo = require("../mongo");


router.post('/clockIn', async(req, res)=> {
	//Make sure we're not already clocked in
	mongo.getDB().collection("hour").findOne({ userID: req.body.userID, parentID: req.body.parentID, clockedOut: null})
	.then(result => {
		if (result){
			res.send({
				code: "ALREADY_CLOCKED_IN"
			});
			return;
		}
		//Now clock in logic
		var id = helper.generateUID();
		mongo.getDB().collection("hour").insertOne({hourID: id, userID: req.body.userID, parentID: req.body.parentID, parentType: req.body.parentType, clockedIn: req.body.clockedIn, clockedOut: null})
		.then(result => res.send({
			code: "OK",
			model: {
				id: id,
				userID: req.body.useID,
				parentID: req.body.parentID,
				parentType: req.body.parentType,
				clockedIn: req.body.clockedIn,
				clockedOut: null
			}
		}))
		.catch(err => res.send(err));
	})
	.catch(err => res.send(err));
})
router.put('/clockOut', async(req, res)=> {
	//Make sure we're not already clocked in
	mongo.getDB().collection("hour").findOne({ userID: req.body.userID, parentID: req.body.parentID, clockedOut: null})
	.then(result => {
		if (!result){
			res.send({
				code: "ALREADY_CLOCKED_OUT"
			});
			return;
		}
		console.log("Result:");
		console.log(result);
		//Now clock in logic
		mongo.getDB().collection("hour").updateOne(
			{
				_id: result._id
			},
			{
				$set: {
					clockedOut: req.body.clockedOut
				}
			}
		)
		.then(anotherResult => {
				res.send({
				code: "OK"
			})
		})
		.catch(err => {console.log(err);res.send(err)});
	})
	.catch(err => {console.log(err);res.send(err)});
})

router.get('/getHours/userID/:userID/parentID/:parentID', async(req, res)=> {
	var parentID = req.params.parentID;
	var userID = req.params.userID;
	mongo.getDB().collection("hour").find({parentID: parentID, userID: userID}).toArray(function(e, result){
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
	})
})

router.get('/getClockedIn/parentID/:parentID/userID/:userID', async(req, res)=> {
	mongo.getDB().collection("hour").find({parentID: req.params.parentID, userID: req.params.userID, clockedOut: null}).toArray(function(e, result){
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
	})
})

//get time for a user for a task or project
router.get('/getTime/userID/:userID/parentID/:parentID', async(req, res) => {
	mongo.getDB().collection("hour").find({userID: req.params.userID, parentID: req.params.parentID}).toArray(function(e, result){
		res.send({
			code: "OK",
			hours: result
		});
	})
})


router.get('/getHoursForProject/projectID/:projectID', async(req, res) =>{
	var projectID = req.params.projectID
	mongo.getDB().collection("hour").find({parentID: projectID}).toArray(function(e, result){
		if (result.length == 0){
			res.send({
				code: "NO_TIME"
			});
			return;
		}
		res.send({
			code: "OK",
			hours: result
		});
	})
})

module.exports = {
	routes: router,
}