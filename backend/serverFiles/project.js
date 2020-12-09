const express = require("express")
const router = express.Router();
const helper = require("../helper");
const mongo = require("../mongo");

//PROJECT
router.post('/create', async (req, res) => {
	var model = req.body;
	var deleted = 0;
	var id = helper.generateUID();
	mongo.getDB().collection("project").insertOne({projectID: id, ownerID: model.ownerID, title: model.title, summary: model.summary, deleted: deleted, users: [model.ownerID]})
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
});

router.get('/getProjects/userID/:userID', async(req, res)=> {
	var userID = req.params.userID;
	const cursor = mongo.getDB().collection("project").find({deleted: 0});
	var projects = [];
	await cursor.forEach(project =>{
		if (project.users && project.users.includes(userID)){
			projects.push(project);
		}
	});
	res.send({
		code: "OK",
		projects: projects
	});
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
		var users = result.users;
		mongo.getDB().collection("user").findOne({ username: username})
		.then(user => {
			var userID = user.id
			users.push(userID);
			mongo.getDB().collection("project").updateOne(
				{projectID: projectID}, 
				{
					$set: {
						users: users
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
})

module.exports = {
	routes: router,
}