const express = require("express")
const router = express.Router();
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
})

module.exports = {
	routes: router,
}