const express = require("express")
const router = express.Router();
//const server = require("../server.js");
const sql = require("../sql");
const helper = require("../helper");

//MESSAGE
router.post('/api/message/create', async (req, res) => {
	var model = req.body;
	var timePublished = Date.now; //not sure this will work
	var editDate = Date.now;
	var deleted = 0; 
	var id = server.data.generateUID();
	try{
		var queryString = `INSERT INTO message (id, projectID, userID, content, timePublished, editDate, priority, deleted) VALUES ('${id}', '${model.projectID}', '${model.userID}', '${model.content}', '${timePublished}', '${editDate}', '${model.priority}', '${deleted}')`;
		sql.query(queryString, function(result){
			res.send({
				code: "OK",
				model:{
					id: id,
					projectID: projectID,
					userID: userID,
					content: content,
					timePublished: timePublished,
					editDate: editDate,
					priority: priority,
					deleted: deleted //should this be returned in the object?
				}
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

//message by id
router.get('/api/message/:id', async (req, res) => {
	try{
		var queryString = `SELECT * FROM message WHERE id = '${req.params.id}' AND deleted = 0`;
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
					projectID: model.projectID,
					userID: model.userID,
					content: model.content,
					timePublished: model.timePublished,
					editDate: model.editDate,
					priority: model.priority,
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

//message by project
router.get("/api/message/projectID/:projectID", async(req,res)=>{
	var id = req.params.projectID;
	try{
		var queryString = `SELECT * FROM message WHERE projectID = '${id}' AND deleted = 0`;
		sql.query(queryString, function(result){
			if (result.length == 0){
				res.send({
					code: "NO_MESSAGES"
				});
				return;
			}
			res.send({
				code: "OK",
				messages: result
			});
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
});

router.put('/api/message/update/:id', async (req, res) => {
	var editDate = Date.now;
	var model = req.body;
	try{
		var queryString = `UPDATE message SET (content, editDate, priority, deleted) VALUES (${model.content}', '${editDate}', '${model.priority}', '${deleted}')
							WHERE id = '${req.params.id}'`;
		sql.query(queryString, function(result){
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
					projectID: model.projectID,
					userID: model.userID,
					content: model.content,
					timePublished: model.timePublished,
					editDate: model.editDate,
					priority: model.priority,
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

router.put("/api/message/delete/:id", async(req,res) =>{
	var id = req.params.messageID;
	try{
		var queryString = `UPDATE message SET deleted = 1 WHERE id = ${id}`;
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

module.exports = {
	routes: router,
}