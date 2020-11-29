const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
const mongoose = require('mongoose');
const mysql = require('mysql');

// connect to the database
mongoose.connect('mongodb://localhost:27017/forkliftDev', {
	useNewUrlParser: true
  });


// // Create a scheme for products in the museum: a title and a path to an image.
// const saveSchema = new mongoose.Schema({
// 	name: String,
// 	board: [
// 	  [{
// 		type: String
// 	  }]
// 	],
// 	score: String
//   });
//   // Create a model for products in the museum.
//   const Save = mongoose.model('Save', saveSchema);

//   const save = new Save({
//     name: "MichaelS",
//     board: "boardd",
//     score: "scoreSave"
//   });
//   try {
//     save.save();
//     console.log("Saved")
//   } catch (error) {
//     console.log(error);
//     console.log("Not saved")
//   }

  
//   async function testStuff(){
// 	try {
// 		let saves = await Save.find();
// 		console.log("Saves:");
// 		console.log(saves);
// 	} catch (error) {
// 		console.log(error);
// 	}

//   }
//   testStuff()

  
const { time } = require('console');

const user = require("./serverFiles/user.js");
app.use("/api/user", user.routes);

const task = require("./serverFiles/task.js");
app.use("/api/task", task.routes);

const hour = require("./serverFiles/hour.js");
app.use('/api/hour', hour.routes);

const message = require("./serverFiles/message.js");
app.use('/api/message', message.routes);

const project = require("./serverFiles/project.js");
app.use('/api/project', project.routes);






var connection;

function handleDisconnect() {
	connection = mysql.createConnection({
		host: '34.71.2.189',
		user: 'forklift',
		password: 'tomato',
		database: 'forklift'
	});

	connection.connect(function(err){
		if (err){
			console.log("Couldn't connect: " + err);
			throw err;
		} 
		console.log("connected to database");
		app.listen(3000, () => console.log('Server listening on port 3000!!'));
	});
	connection.on('error', function(err) {
		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
			handleDisconnect();   
		} else {                                      
			throw err;                                 
		}
	});
}

handleDisconnect();
var methods = {
	async query(sql, successCallback, errorCallback){ //TODO move these to a shared location
		connection.query(sql, function (err, result) {
			if (err){ 
				errorCallback(err);
			} else {
				successCallback(result);
			}
		});
	},
	generateUID: function() {
		return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	SQLDateTime: function(date){
		if (date == ""){
			return "";
		}
		return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
	}
};


exports.data = methods;
