const express = require("express")
const router = express.Router();
//const server = require("../server.js");
const sql = require("../sql");
const helper = require("../helper");

//PROJECT
router.post('/create', async (req, res) => {
	var model = req.body;
	var deleted = 0;
	var id = server.data.generateUID();
	try{
		var queryString = `INSERT INTO project (projectID, title, summary, ownerID, deleted) VALUES ('${id}', '${model.title}', '${model.summary}', '${model.ownerID}', '${deleted}')`;
		sql.query(queryString, function(result){
			try{
				var mapperQueryString = `INSERT INTO projectUsers (projectID, userID) VALUES ('${id}', '${model.ownerID}')`;
				sql.query(mapperQueryString, function(result){
					res.send({
						code: "OK",
						model:{
							id: id,
							title: model.title,
							summary: model.summary,
							ownerID: model.ownerID,
							deleted: deleted
						}
					});
				},
				function(error){
					res.send(error);
				})
			} catch (error){
				res.send(error);
			}
		},
		function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.get('/:id', async (req, res) => {
	try{
		var queryString = `SELECT * FROM project WHERE projectID = '${req.params.id}' AND deleted = 0`;
		sql.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "INVALID_ID"
				});
				return;
			}
			var model = result[0];
			res.send({
				code: "OK",
				model:{
					id: model.id,
					title: model.title,
					summary: model.summary,
					ownerID: model.ownerID,
					deleted: model.deleted
				}
			});
		},
		function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.put('/update/:id', async (req, res) => {
	var model = req.body;
	//probably need to make a check to see if it is already deleted.
	try{
		var queryString = `UPDATE project SET ownerID = '${model.ownerID}', title = '${model.title}', summary = '${model.summary}', deleted = '${model.deleted}' WHERE projectID = '${model.id}'`;
		sql.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "INVALID_ID"
				});
				return;
			}
			res.send({ //also not sure if we need to send the model back here...
				code: "OK",
				model:{
					id: model.id,
					title: model.title,
					summary: model.summary,
					ownerID: model.ownerID,
					deleted: model.deleted
				}
			});
		},
		function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.put("/delete/:id", async(req,res) =>{
	var id = req.params.id;
	try{
		var queryString = `UPDATE project SET deleted = 1 WHERE projectID = '${id}'`;
		sql.query(queryString, function(result){
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

router.get('/getProjects/userID/:userID', async(req, res)=> {
	var userID = req.params.userID;
	try{
		var queryString = `select project.* from project where project.projectID in (  select projectUsers.projectID from projectUsers where projectUsers.userID = "${userID}") AND project.deleted = '0'`;
		sql.query(queryString, function(result){
			res.send({
				code: "OK",
				projects: result
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

router.put("/addUser/username/:username/projectID/:projectID", async(req,res)=> {
	var username = req.params.username;
	var projectID = req.params.projectID;
	try{
		var queryString = `INSERT INTO projectUsers (projectID, userID) VALUES ('${projectID}', (select user.id from user where user.username = '${username}'))`;
		sql.query(queryString, function(result){
			try{
				var queryString = `SELECT * from user where user.username = '${username}'`;
				sql.query(queryString, function(result){
					res.send({
						code: "OK",
						user: result
					});
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

module.exports = {
	routes: router,
}