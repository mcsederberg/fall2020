const express = require("express")

const router = express.Router();
const server = require("../server.js");

router.post('/create', async(req, res) => {
	let id = server.data.generateUID();
	let parentType = req.body.parentType ? req.body.parentType : "project";
	try {
		let queryString = `INSERT INTO hour (hourID, userID, parentID, parentType, time) VALUES ('${id}', ${req.body.userID}', '${req.body.parentID}', '${parentType}', '${req.body.time}'`
		server.data.query(queryString, 
			function(result){
				res.send({
					code: "OK",
					model: {
						time: req.body.time
					} //need others?
			})
		}, function(error){
			res.send(error);
		})
	} catch (error){
		res.send(error);
	}
})

