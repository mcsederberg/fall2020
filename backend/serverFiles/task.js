const express = require("express")

const router = express.Router();
//const server = require("../server.js");
// const sql = require("../sql");
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
	// try{
	// 	var queryString;
	// 	if (!model.completedDate) {
	// 		queryString = `INSERT INTO task (id, userID, projectID, title, summary, dueDate, completedDate, percentComplete, startDate, parentID, deleted) VALUES ('${id}', '${model.userID}','${model.projectID}','${model.title}','${model.summary}','${model.dueDate}',NULL,'${model.percentComplete}','${model.startDate}', '${model.parentID}','0')`;
	// 	}
	// 	else {
	// 		queryString = `INSERT INTO task (id, userID, projectID, title, summary, dueDate, completedDate, percentComplete, startDate, parentID, deleted) VALUES ('${id}', '${model.userID}','${model.projectID}','${model.title}','${model.summary}','${model.dueDate}','${model.completedDate}','${model.percentComplete}','${model.startDate}', '${model.parentID}','0')`;
	// 	}
	// 	sql.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK",
	// 			model: {
	// 				id: id,
	// 				userID: model.userID,
	// 				projectID: model.projectID,
	// 				title: model.title,
	// 				summary: model.summary,
	// 				dueDate: model.dueDate,
	// 				completedDate: model.completedDate,
	// 				percentComplete: model.percentComplete,
	// 				startDate: model.startDate,
	// 				parentID: model.parentID,
	// 				deleted: model.deleted
	// 			}
	// 		})
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
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
	// try{
	// 	var queryString;
	// 	if (!model.completedDate) {
	// 		queryString = `UPDATE task SET title ='${model.title}',	userID='${model.userID}', summary = '${model.summary}', dueDate = '${model.dueDate}', completedDate = NULL, percentComplete = '${model.percentComplete}', startDate = '${model.startDate}', parentID = '${model.parentID}', deleted = '0' where id = '${model.taskID}'`;
	// 	}
	// 	else {
	// 		queryString = `UPDATE task SET title ='${model.title}',	userID='${model.userID}', summary = '${model.summary}', dueDate = '${model.dueDate}', completedDate = '${model.completedDate}', percentComplete = '${model.percentComplete}', startDate = '${model.startDate}', parentID = '${model.parentID}', deleted = '0' where id = '${model.taskID}'`;
	// 	}
	// 	sql.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK",
	// 			model: {
	// 				id: model.taskID,
	// 				userID: model.userID,
	// 				projectID: model.projectID,
	// 				title: model.title,
	// 				summary: model.summary,
	// 				dueDate: model.dueDate,
	// 				completedDate: model.completedDate,
	// 				percentComplete: model.percentComplete,
	// 				startDate: model.startDate,
	// 				parentID: model.parentID,
	// 				deleted: model.deleted
	// 			}
	// 		})
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
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
	// try{
	// 	var queryString = `UPDATE task SET completedDate ='${completedDate}', percentComplete=100 WHERE id = '${id}'`;
	// 	sql.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK",
	// 			completedDate: completedDate
	// 		})
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
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

	// try{
	// 	var queryString = `SELECT task.*, firstName FROM task JOIN user ON task.userID=user.id WHERE projectID = '${id}' AND deleted = 0`;
	// 	sql.query(queryString, function(result){
	// 		if (result.length == 0){
	// 			res.send({
	// 				code: "NO_TASKS"
	// 			});
	// 			return;
	// 		}
	// 		res.send({
	// 			code: "OK",
	// 			tasks: result
	// 		});
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }

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

	// try{
	// 	var queryString = `SELECT * FROM task WHERE projectID = '${projectID}' AND userID = '${userID}' AND deleted = 0`;
	// 	sql.query(queryString, function(result){
	// 		if (result.length == 0){
	// 			res.send({
	// 				code: "NO_TASKS"
	// 			});
	// 			return;
	// 		}
	// 		res.send({
	// 			code: "OK",
	// 			tasks: result
	// 		});
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }

});
//Get single task
//We're not currently using this call
// router.get("/taskID/:taskID", async(req,res)=>{
// 	var id = req.params.taskID;
// 	try{
// 		var queryString = `SELECT * FROM  task WHERE id = '${id}' AND deleted = 0`;
// 		sql.query(queryString, function(result){
// 			if (result.length == 0){
// 				res.send({
// 					code: "NO_TASK"
// 				});
// 				return;
// 			}
// 			res.send({
// 				code: "OK",
// 				tasks: result
// 			});
// 		}, function(error){
// 			res.send(error);
// 		})
// 	} catch (error){
// 		res.send(error);
// 	}
// });


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
	// try{
	// 	var queryString = `UPDATE task SET deleted = 1 WHERE id = '${id}'`;
	// 	sql.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK"
	// 		});
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
});

module.exports = {
	routes: router,
}