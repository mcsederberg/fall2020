// import vue from 'vue'
import axios from 'axios'
import Task from './models/Task';
import User from './models/User';

const client = axios.create({
//   baseURL: 'http://18.218.126.54:3000',
  baseURL: 'http://localhost:3000',
  json: true,
  headers: {
	"Content-type": "application/json"
  }
})
// const Vue = vue;

export default {
	async register(username, password, firstName, lastName){
		return new Promise(function(resolve, reject){
			var res = client.post("/api/register", {
				username: username, 
				password: password,
				firstName: firstName,
				lastName: lastName
			});	
			res.then(function(response) {
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var model = response.data.model;
				resolve({
					status: "OK",
					user: new User(model.id, model.username, model.password, model.firstName, model.lastName)
				});
				return;
			}).catch(function(e) {
				console.log("error", e);
				reject({
					status: "BAD",
					error: e
				});
			});
		});
	},
	async login(username, password){
		return new Promise(function(resolve, reject){
			var res =  client.post("/api/login",{
				username: username,
				password: password
			});	
			res.then(function(response) {
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var model = response.data.model;
				resolve({
					status: "OK",
					user: new User(model.id, model.username, model.password, model.firstName, model.lastName)
				})
				return;
			}).catch(function(e) {
				console.log("error", e);
				return e;
			})
		});
	},


	/*
		TASKS
	*/

	async createTask(userID, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete){
		return new Promise(function(resolve, reject){
			var res = client.post("/api/task/create", {
				userID: userID,
				projectID: projectID,
				title: title,
				summary: summary,
				dueDate: dueDate,
				startDate: startDate,
				completedDate: completedDate,
				status: status,
				percentComplete: percentComplete
			});
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var model = response.data.model;
				resolve({
					status: "OK",
					task: new Task(model.id, model.userID, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.status, model.percentComplete, model.deleted)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getTasksForProjectID(projectID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/tasks/projectID/" + projectID);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var tasksData = response.data.tasks;
				var tasks = [];
				for (var i = 0; i < tasksData.length; i++){
					var model = tasksData[i];
					tasks.push(new Task(model.id, model.userID, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.status, model.percentComplete, model.deleted))
				}
				resolve({
					status: "OK",
					tasks: tasks
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	}
	
}