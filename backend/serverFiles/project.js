const express = require("express")
const router = express.Router();
//const server = require("../server.js");
// const sql = require("../sql");
const helper = require("../helper");
const mongo = require("../mongo");
const ObjectID = require("mongodb").ObjectID;

// mongo.getDB().collection("user").findOne({ username: username})
// 		.then(result => {
// 			var hashedPassword = result.password;
// 			var isPassword = passwordHash.verify(password, hashedPassword);
// 			if (!isPassword){
// 				res.send({
// 					code: "INCORRECT_PASSWORD"
// 				});
// 				return;
// 			}
// 			var model = result;
// 			res.send({
// 				code: "OK",
// 				model:{
// 					id: model.id,
// 					username: model.username,
// 					password: model.password,
// 					firstName: model.firstName,
// 					lastName: model.lastName
// 				}
// 			});
// 		})
// 		.catch(err => res.send(err));

//PROJECT
router.post('/create', async (req, res) => {
	var model = req.body;
	var deleted = 0;
	var id = helper.generateUID();
	mongo.getDB().collection("project").insertOne({projectID: id, ownerID: model.ownerID, title: model.title, summary: model.summary, deleted: deleted, projectUsers: [model.ownerID]})
	.then(result => {
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
	}).catch(err=>res.send(err));
	// try{
	// 	//var queryString = `INSERT INTO project (projectID, title, summary, ownerID, deleted) VALUES ('${id}', '${model.title}', '${model.summary}', '${model.ownerID}', '${deleted}')`;
	// 	sql.query(queryString, function(result){
	// 		try{
	// 			var mapperQueryString = `INSERT INTO projectUsers (projectID, userID) VALUES ('${id}', '${model.ownerID}')`;
	// 			sql.query(mapperQueryString, function(result){
	// 				res.send({
	// 					code: "OK",
	// 					model:{
	// 						id: id,
	// 						title: model.title,
	// 						summary: model.summary,
	// 						ownerID: model.ownerID,
	// 						deleted: deleted
	// 					}
	// 				});
	// 			},
	// 			function(error){
	// 				res.send(error);
	// 			})
	// 		} catch (error){
	// 			res.send(error);
	// 		}
	// 	},
	// 	function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

router.get('/:id', async (req, res) => {
	
	mongo.getDB().collection("project").findOne({ projectID: req.params.id, deleted: 0})
	.then(result => {
		if (!result){
			res.send({
				code: "INVALID_ID"
			});
			return;
		}
		var model = result;
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
	})
	.catch(err => res.send(err));
	// try{
	// 	var queryString = `SELECT * FROM project WHERE projectID = '${req.params.id}' AND deleted = 0`;
	// 	sql.query(queryString, function(result){
	// 		if (result.length == 0){
	// 			res.send({
	// 				code: "INVALID_ID"
	// 			});
	// 			return;
	// 		}
	// 		var model = result[0];
	// 		res.send({
	// 			code: "OK",
	// 			model:{
	// 				id: model.id,
	// 				title: model.title,
	// 				summary: model.summary,
	// 				ownerID: model.ownerID,
	// 				deleted: model.deleted
	// 			}
	// 		});
	// 	},
	// 	function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

router.put('/update/:id', async (req, res) => {
	var model = req.body;
	mongo.getDB().collection("project").updateOne(
		{projectID: req.params.id}, 
		{
			$set: {
				ownerID: model.ownerID,
				title: model.title,
				summary: model.summary,
				deleted: model.deleted
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
			model:{
				id: model.id,
				title: model.title,
				summary: model.summary,
				ownerID: model.ownerID,
				deleted: model.deleted
			}
		});
	})
	.catch(err => res.send(err));
	// try{
	// 	var queryString = `UPDATE project SET ownerID = '${model.ownerID}', title = '${model.title}', summary = '${model.summary}', deleted = '${model.deleted}' WHERE projectID = '${model.id}'`;
	// 	sql.query(queryString, function(result){
	// 		if (result.length == 0){
	// 			res.send({
	// 				code: "INVALID_ID"
	// 			});
	// 			return;
	// 		}
	// 		res.send({ //also not sure if we need to send the model back here...
	// 			code: "OK",
	// 			model:{
	// 				id: model.id,
	// 				title: model.title,
	// 				summary: model.summary,
	// 				ownerID: model.ownerID,
	// 				deleted: model.deleted
	// 			}
	// 		});
	// 	},
	// 	function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

router.put("/delete/:id", async(req,res) =>{
	var id = req.params.id;
	mongo.getDB().collection("project").updateOne(
		{projectID: id},
		{
		$set: {
			deleted: 1
		}
	})
	.then(result => {
		if (!result){
			res.send({
				code: "INVALID_ID"
			});
			return;
		}
		res.send({
			code: "OK"
		});
	})
	.catch(err => res.send(err));
	// try{
	// 	var queryString = `UPDATE project SET deleted = 1 WHERE projectID = '${id}'`;
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

router.get('/getProjects/userID/:userID', async(req, res)=> {
	var userID = req.params.userID;
	const cursor = mongo.getDB().collection("project").find({deleted: 0});
	var projects = [];
	await cursor.forEach(project =>{
		if (project.projectUsers && project.projectUsers.includes(userID)){
			projects.push(project);
		}
	});
	res.send({
		code: "OK",
		projects: projects
	});

	// try{
	// 	var queryString = `select project.* from project where project.projectID in (  select projectUsers.projectID from projectUsers where projectUsers.userID = "${userID}") AND project.deleted = '0'`;
	// 	sql.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK",
	// 			projects: result
	// 		});
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

router.put("/addUser/username/:username/projectID/:projectID", async(req,res)=> {
	var username = req.params.username;
	var projectID = req.params.projectID;
	mongo.getDB().collection("project").findOne({ projectID: projectID})
	.then(result => {
		if (!result){
			res.send({
				code: "INVALID_ID"
			});
			return;
		}
		var projectUsers = result.projectUsers;
		mongo.getDB().collection("user").findOne({ username: username})
		.then(user => {
			var userID = user.id
			projectUsers.push(userID);
			mongo.getDB().collection("project").updateOne(
				{projectID: projectID}, 
				{
					$set: {
						projectUsers: projectUsers
					}
				}
			)
			.then(result => {
				res.send({
					code: "OK"
				});
			}).catch(err => {console.log(err);res.send(err)});
		}).catch(err => {console.log(err);res.send(err)});
	}).catch(err => {console.log(err);res.send(err)});

	// try{
	// 	var queryString = `INSERT INTO projectUsers (projectID, userID) VALUES ('${projectID}', (select user.id from user where user.username = '${username}'))`;
	// 	sql.query(queryString, function(result){
	// 		try{
	// 			var queryString = `SELECT * from user where user.username = '${username}'`;
	// 			sql.query(queryString, function(result){
	// 				res.send({
	// 					code: "OK",
	// 					user: result
	// 				});
	// 			}, function(error){
	// 				res.send(error);
	// 			})
	// 		} catch (error){
	// 			res.send(error);
	// 		}
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

router.put("/removeUser/userID/:userID/projectID/:projectID", async(req,res)=> {
	var userID = req.params.userID;
	var projectID = req.params.projectID;
	mongo.getDB().collection("project").findOne({ projectID: projectID})
	.then(result => {
		if (!result){
			res.send({
				code: "INVALID_ID"
			});
			return;
		}
		const index = result.indexOf(userID);
		if (index > -1) {
			result.splice(index, 1);
		}
		mongo.getDB().collection("project").insertOne(result)
		.then(result => {
			res.send({
				code: "OK"
			});
		}).catch(err=>res.send(err));
	}).catch(err => res.send(err));

	// try{
	// 	var queryString = `DELETE FROM projectUsers WHERE projectID = '${projectID}' AND userID = '${userID}';`;
	// 	server.data.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK",
	// 			user: result
	// 		});
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

module.exports = {
	routes: router,
}