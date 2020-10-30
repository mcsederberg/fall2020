const express = require("express")

const router = express.Router();
const server = require("../server.js");

//Create task
router.post("/create", async(req, res) => {
	var id = server.data.generateUID();
	var model = req.body;
	try{
		var queryString = `INSERT INTO task (id, userID, projectID, title, summary, dueDate, completedDate, status, percentComplete, startDate, deleted) VALUES ('${id}', '${model.userID}','${model.projectID}','${model.title}','${model.summary}','${model.dueDate}','${model.completedDate}','${model.status}','${model.percentComplete}','${model.startDate}','0')`;
		server.data.query(queryString, function(result){
			res.send({
				code: "OK",
				model: {
					id: id,
					userID: model.userID,
					projectID: model.projectID,
					title: model.title,
					summary: model.summary,
					dueDate: model.dueDate,
					completedDate: model.completedDate,
					status: model.status,
					percentComplete: model.percentComplete,
					startDate: model.startDate,
					deleted: model.deleted
				}
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
});

//update task
router.put("/update", async(req, res) => {
	var model = req.body;
	try{
		var queryString = `UPDATE task SET title ='${model.title}',	summary = '${model.summary}', dueDate = '${model.dueDate}', completedDate = '${model.completedDate}', status = '${model.status}', percentComplete = '${model.percentComplete}', startDate = '${model.startDate}', deleted = '0' where id = '${model.taskID}'`;
		server.data.query(queryString, function(result){
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
					status: model.status,
					percentComplete: model.percentComplete,
					startDate: model.startDate,
					deleted: model.deleted
				}
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
});
//Complete task
router.put("/complete", async(req, res) => {
	var id = req.body.taskID;
	var completeDate = req.body.completeDate;
	try{
		var queryString = `UPDATE task SET completedDate ='${completeDate}' where id = '${id}'`;
		server.data.query(queryString, function(result){
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
					status: model.status,
					percentComplete: model.percentComplete,
					startDate: model.startDate,
					deleted: model.deleted
				}
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
});


//Get all tasks
router.get("/projectID/:projectID", async(req,res)=>{
	var id = req.params.projectID;
	try{
		var queryString = `SELECT task.*, firstName FROM task JOIN user ON task.userID=user.id WHERE projectID = '${id}' AND deleted = 0`;
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "NO_TASKS"
				});
				return;
			}
			res.send({
				code: "OK",
				tasks: result
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}

});

//Get all tasks for a user
router.get("/projectID/:projectID/userID/:userID", async(req,res)=>{
	var projectID = req.params.projectID;
	var userID = req.params.userID;

	try{
		var queryString = `SELECT *.task, firstName FROM task JOIN user ON task.userID=user.id WHERE projectID = '${projectID}' AND userID = '${userID}' AND deleted = 0`;
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "NO_TASKS"
				});
				return;
			}
			res.send({
				code: "OK",
				tasks: result
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}

});
//Get single task
router.get("/taskID/:taskID", async(req,res)=>{
	var id = req.params.taskID;
	try{
		var queryString = `SELECT * FROM  task WHERE id = '${id}' AND deleted = 0`;
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "NO_TASK"
				});
				return;
			}
			res.send({
				code: "OK",
				tasks: result
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
});


//Delete task
router.put("/delete/task/:taskID", async(req,res) =>{
	var id = req.params.taskID;
	try{
		var queryString = `UPDATE task SET deleted = 1 WHERE id = '${id}'`;
		server.data.query(queryString, function(result){
			res.send({
				code: "OK"
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
});

module.exports = {
	routes: router,
}