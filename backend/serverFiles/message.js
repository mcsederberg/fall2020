const express = require("express")
const router = express.Router();
//const server = require("../server.js");
const mongo = require("../mongo");
const helper = require("../helper");

//MESSAGE
router.post('/createMessage', async (req, res) => {
	var model = req.body;
	var deleted = 0; 
	var id = helper.generateUID();
	
	mongo.getDB().collection("message").insertOne({
		messageID: id,
		projectID: model.projectID,
		userID: model.userID,
		content: model.content,
		timePublished: model.timePublished,
		editDate: model.editDate,
		priority: model.priority,
		deleted: 0
	})
	.then(result =>res.send({
		code: "OK",
		model:{
			id: id,
			projectID: model.projectID,
			userID: model.userID,
			content: model.content,
			timePublished: model.timePublished,
			editDate: model.editDate,
			priority: model.priority,
			deleted: deleted
		}
	})
	).catch(err => res.send(err));


	// try{
	// 	var queryString = `INSERT INTO message (messageID, projectID, userID, content, timePublished, editDate, priority, deleted) VALUES ('${id}', '${model.projectID}', '${model.userID}', '${model.content}', '${model.timePublished}', '${model.editDate}', '${model.priority}', '${deleted}')`;
	// 	sql.query(queryString, function(result){
	// 		res.send({
	// 			code: "OK",
	// 			model:{
	// 				id: id,
	// 				projectID: model.projectID,
	// 				userID: model.userID,
	// 				content: model.content,
	// 				timePublished: model.timePublished,
	// 				editDate: model.editDate,
	// 				priority: model.priority,
	// 				deleted: deleted
	// 			}
	// 		})
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

//message by id
router.get('/:id', async (req, res) => {

	mongo.getDB().collection("message").findOne({ id: req.params.id, deleted: 0})
		.then(result => {
			var model = result;
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
		}).catch(err => res.send(err));


	// try{
	// 	var queryString = `SELECT * FROM message WHERE id = '${req.params.id}' AND deleted = 0`;
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
	// 				projectID: model.projectID,
	// 				userID: model.userID,
	// 				content: model.content,
	// 				timePublished: model.timePublished,
	// 				editDate: model.editDate,
	// 				priority: model.priority,
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

//message by project
router.get("/getMessagesForProject/:projectID", async(req,res)=>{
	var id = req.params.projectID;

	mongo.getDB().collection("message").find({projectID: id, deleted: 0}).toArray(function(e, result){
		res.send({
			code: "OK",
			messages: result
		});
	})


	// try{
	// 	var queryString = `SELECT * FROM message WHERE projectID = '${id}' AND deleted = 0`;
	// 	sql.query(queryString, function(result){
	// 		if (result.length == 0){
	// 			res.send({
	// 				code: "NO_MESSAGES"
	// 			});
	// 			return;
	// 		}
	// 		res.send({
	// 			code: "OK",
	// 			messages: result
	// 		});
	// 	}, function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
});

//id, text, date, priority, and deleted

router.put('/update/:id', async (req, res) => {
	var model = req.body;

	mongo.getDB().collection("message").updateOne(
		{messageID: req.params.id}, 
		{
			$set: {
				content: model.content,
				editDate: model.editDate,
				priority: model.priority,
				deleted: model.deleted
			}
		}
	)
	.then(result => {
		res.send({
			code: "OK"
		});
	}).catch(err => {console.log(err);res.send(err)});


	// try{
	// 	var queryString = `UPDATE message SET content = '${model.content}', editDate = '${model.editDate}', priority = '${model.priority}', deleted = ${model.deleted} WHERE messageID = '${req.params.id}'`;
	// 	sql.query(queryString, function(result){
	// 		if (result.length == 0){
	// 			res.send({
	// 				code: "INVALID_ID"
	// 			});
	// 			return;
	// 		}
	// 		var model = result[0];
	// 		res.send({ //also not sure if we need to send the model back here...
	// 			code: "OK"
	// 		});
	// 	},
	// 	function(error){
	// 		res.send(error);
	// 	})
	// } catch (error){
	// 	res.send(error);
	// }
})

module.exports = {
	routes: router,
}