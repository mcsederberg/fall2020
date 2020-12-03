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
//const mongoose = require('mongoose');
const sql = require('./sql');

// connect to the database
// mongoose.connect('mongodb://localhost:27017/forkliftDev', {
// 	useNewUrlParser: true
//   });


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


sql.initializeDatabase().then(function() {
	app.listen(3000, () => console.log('Server listening on port 3000!!'));
}).catch(function() {
	console.log("NOT");
})

