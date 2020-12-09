const express = require("express")
const router = express.Router();
const mongo = require("../mongo");
const helper = require("../helper");

//Create task
router.post("/create", async(req, res) => {
	var id = helper.generateUID();
	var model = req.body;
	var completedDate = model.completedDate ? model.completedDate : null;
	mongo.getDB().collection("task").insertOne({id: id,userID: model.userID, projectID: model.projectID, title: model.title, summary: model.summary, dueDate: model.dueDate, completedDate: completedDate, percentComplete: model.percentComplete, startDate: model.startDate, parentID: model.parentID, deleted: 0})
	.then(result => res.send({
		code: "OK",
		model: {
			id: id,
			userID: model.userID,
			projectID: model.projectID,
			title: model.title,
			summary: model.summary,
			dueDate: model.dueDate,
			completedDate: model.completedDate,
			percentComplete: model.percentComplete,
			startDate: model.startDate,
			parentID: model.parentID,
			deleted: model.deleted
		}
	}))
	.catch(err => res.send(err));
});

//update task
router.put("/update", async(req, res) => {
	var model = req.body;
	var completedDate = model.completedDate ? model.completedDate : null;
	mongo.getDB().collection("task").updateOne(
		{id: model.taskID}, 
		{
			$set: {
				title: model.title, 
				userID: model.userID,
				summary: model.summary,
				dueDate: model.dueDate,
				completedDate: completedDate,
				percentComplete: model.percentComplete,
				startDate: model.startDate,
				parentID: model.parentID,
				deleted: 0
			}
		}
	)
	.then(result => {
		if (!result){
			res.send({
				code: "INVALID_ID"
			});
			return;
		}
		res.send({
			code: "OK",
			model: {
				id: model.taskID,
				userID: model.userID,
				projectID: model.projectID,
				title: model.title,
				summary: model.summary,
				dueDate: model.dueDate,
				completedDate: model.completedDate,
				percentComplete: model.percentComplete,
				startDate: model.startDate,
				parentID: model.parentID,
				deleted: model.deleted
			}
		});
	})
	.catch(err => res.send(err));
});
//Complete task
router.put("/complete", async(req, res) => {
	var id = req.body.taskID;
	var completedDate = req.body.completedDate;
	mongo.getDB().collection("task").updateOne(
		{id: id}, 
		{
			$set: {
				completedDate: completedDate, 
				percentComplete: 100
			}
		}
	)
	.then(result => {
		if (!result){
			res.send({
				code: "INVALID_ID"
			});
			return;
		}
		res.send({
			code: "OK",
			completedDate: completedDate
		})
	})
	.catch(err => res.send(err));
});


//Get all tasks
router.get("/projectID/:projectID", async(req,res)=>{
	var id = req.params.projectID;
	const cursor = mongo.getDB().collection("task").find({projectID: id, deleted:0});
	var tasks = [];
	await cursor.forEach(task =>{
		tasks.push(task)
	});
	res.send({
		code: "OK",
		tasks: tasks
	});
});

//Get all tasks for a user
router.get("/projectID/:projectID/userID/:userID", async(req,res)=>{
	var projectID = req.params.projectID;
	var userID = req.params.userID;

	const cursor = mongo.getDB().collection("task").find({projectID: projectID, userID: userID, deleted:0});
	var tasks = [];
	await cursor.forEach(task =>{
		tasks.push(task)
	});
	res.send({
		code: "OK",
		tasks: tasks
	});
});


//Delete task
router.put("/delete/task/:taskID", async(req,res) =>{
	var id = req.params.taskID;
	
	mongo.getDB().collection("task").updateOne(
		{id: id}, 
		{
			$set: {
				deleted: 1
			}
		}
	)
	.then(result => {
		res.send({
			code: "OK"
		});
	})
	.catch(err => res.send(err));
});

module.exports = {
	routes: router,
}