const express = require("express")

const router = express.Router();
const server = require("../server.js");

router.post('/create', async(req, res) => {
	let id = server.data.generateUID();
	let parentType = req.body.parentType ? req.body.parentType : "project";
	try {
		let queryString = `INSERT INTO hour (hourID, userID, parentID, parentType, time) VALUES ('${id}', ${req.body.userID}', '${req.body.parentID}', '${parentType}', '0'`
		server.data.query(queryString, 
			function(result){
				res.send({
					code: "OK",
					model: {
						id: id,
						userID: req.body.userID,
						parentID: req.body.parentID,
						parentType: req.body.parentType,
						time: req.body.time
					}
			})
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