const express = require("express")
const router = express.Router();
const server = require("../server.js");

//PROJECT
router.post('/api/project/create', async (req, res) => {
	var model = req.body;
	var deleted = 0;
	var id = server.data.generateUID();
	try{
		var queryString = `INSERT INTO project (id, title, summary, ownerID, deleted) VALUES ('${id}', '${model.title}', '${model.summary}', '${model.ownerID}', '${deleted}')`;
		server.data.query(queryString, function(result){
			res.send({
				code: "OK",
				model:{
					id: id,
					title: title,
					summary: summary,
					ownerID: ownerID,
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
})

router.get('/api/project/:id', async (req, res) => {
	try{
		var queryString = `SELECT * FROM project WHERE id = '${req.params.id}' AND deleted = 0`;
		server.data.query(queryString, function(result){
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

router.put('/api/project/update/:id', async (req, res) => {
	var model = req.body;
	//probably need to make a check to see if it is already deleted.
	try{
		var queryString = `UPDATE project SET (ownerID, title, summary, deleted) VALUES (${model.title}', '${model.summary}', '${model.ownerID}', '${model.deleted}')
							WHERE id = '${req.params.id}'`;
		server.data.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "INVALID_ID"
				});
				return;
			}
			var model = result[0];
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

router.put("/api/project/delete/:id", async(req,res) =>{
	var id = req.params.projectID;
	try{
		var queryString = `UPDATE project SET deleted = 1 WHERE id = ${id}`;
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