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
//const mongo = require('./mongo');
const sql = require('./sql');

//const mysql = require('mysql');
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

