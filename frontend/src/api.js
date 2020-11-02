// import vue from 'vue'
import axios from 'axios'
import Task from './models/Task';
import User from './models/User';
import Hour from './models/Hour';
import Project from './models/Project';
//import task from '../../backend/serverFiles/task';

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
			var res = client.post("/api/user/register", {
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
			var res =  client.post("/api/user/login",{
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

	async getUsersForProject(projectID){
		return new Promise(function(resolve, reject){
			var res =  client.get("/api/user/getUsersForProject/"+projectID);	
			res.then(function(response) {
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var usersData = response.data.users;
				var users = [];
				for (var i = 0; i < usersData.length; i++){
					var model = usersData[i];
					users.push(new User(model.id, model.username, model.password, model.firstName, model.lastName))
				}
				resolve({
					status: "OK",
					users: users
				})
			}).catch(function(e) {
				console.log("error", e);
				return e;
			})
		});
	},


	/*
		TASKS
	*/

	async createTask(userID, projectID, title, summary, dueDate, startDate, completedDate, percentComplete){
		return new Promise(function(resolve, reject){
			var res = client.post("/api/task/create", {
				userID: userID,
				projectID: projectID,
				title: title,
				summary: summary,
				dueDate: dueDate,
				startDate: startDate,
				completedDate: completedDate,
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
					task: new Task(model.id, model.userID, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.percentComplete, model.deleted)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async updateTask(taskID, userID, projectID, title, summary, dueDate, startDate, completedDate, percentComplete){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/task/update", {
				taskID: taskID,
				projectID: projectID,
				userID: userID,
				title: title,
				summary: summary,
				dueDate: dueDate,
				startDate: startDate,
				completedDate: completedDate,
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
					task: new Task(model.id, model.userID, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.percentComplete, model.deleted)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async completeTask(taskID, completeDate){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/task/complete", {taskID: taskID, completeDate: completeDate});
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
					task: new Task(model.id, model.userID, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.percentComplete, model.deleted)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async deleteTask(id){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/task/delete/task/"+id);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				resolve({
					status: "OK"
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getSortedTasksForProjectID(projectID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/task/projectID/" + projectID);
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
				var delayedTasks = [];
				var inProgressTasks = [];
				var completedTasks = [];
				var futureTasks = [];
				var errors = [];
				for (var i = 0; i < tasksData.length; i++){
					var model = tasksData[i];
					var task = new Task(model.id, model.userID, model.firstName, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.percentComplete, model.deleted);
					var today = new Date();
					if (new Date(task.dueDate) < today && !task.completedDate) {
						delayedTasks.push(task);
					}
					else if (new Date(task.startDate) <= today && new Date(task.dueDate) > today && !task.completedDate) {
						inProgressTasks.push(task);
					}
					else if (task.completedDate) {
						completedTasks.push(task);
					}
					else if (new Date(task.startDate) > today && !task.completedDate) {
						futureTasks.push(task);
					}
					else {
						errors.push(task);
					}
				}
				resolve({
					status: "OK",
					tasks: {
						delayedTasks: delayedTasks,
						inProgressTasks: inProgressTasks,
						completedTasks: completedTasks,
						futureTasks: futureTasks,
						error: errors
					}
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getTasksForProjectID(projectID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/task/projectID/" + projectID);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				resolve({
					status: "OK",
					tasks: response.data.tasks
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getTasksForUserAndProject(projectID, userID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/task/projectID/" + projectID + "/userID/" + userID);
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
					tasks.push(new Task(model.id, model.userID, model.userFirstName, model.projectID, model.title, model.summary, model.dueDate, model.startDate, model.completedDate, model.percentComplete, model.deleted))
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
	},



	/*      HOURS        */
	
	async clockIn(userID, parentID, parentType,clockedIn){
		return new Promise(function(resolve, reject){
			var res = client.post("/api/hour/clockIn", {
				userID: userID,
				parentID: parentID,
				parentType: parentType,
				clockedIn: clockedIn
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
					hour: new Hour(model.id, model.userID, model.parentID, model.parentType, model.clockedIn, model.clockedOut)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async clockOut(userID, parentID, clockedOut){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/hour/clockOut", {
				userID: userID,
				parentID: parentID,
				clockedOut: clockedOut
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
					hour: new Hour(model.id, model.userID, model.parentID, model.parentType, model.clockedIn, model.clockedOut)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getClockedIn(userID, parentID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/hour/getClockedIn/parentID/" + parentID + "/userID/" + userID);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				resolve({
					status: "OK",
					clockedIn: response.data.clockedIn
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getHoursByUserIDAndParentID(userID, parentID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/hour/getHours/userID/" + userID + "/parentID/" + parentID);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var models = response.data.models;
				var hours = []
				for (var i = 0; i < models.length; i++){
					var model = models[i];
					if (model.clockedOut == undefined) {
						model.clockedOut = new Date();
					}
					hours.push(new Hour(model.id, model.userID, model.parentID, model.parentType, model.clockedIn, model.clockedOut));
				}
				resolve({
					status: "OK",
					hours: hours
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async getTimeForUser(userID, parentID){
		return new Promise(function(resolve, reject){
			if (!userID || !parentID) {
				reject({
					status: "BAD",
					error: "Incomplete information"
				});
				return;
			}
			var res = client.get("/api/hour/getTime/userID/" + userID + "/parentID/" + parentID);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var models = response.data.hours;
				var totalTime = 0
				for (var i = 0; i < models.length; i++){
					var model = models[i];
					if (model.clockedOut == undefined) {
						model.clockedOut = new Date().toISOString();
					}
					totalTime += (new Date(model.clockedOut) - new Date(model.clockedIn));
				}
				//totalTime is in seconds, convert to hours
				var hours = new Date(totalTime).toISOString().substr(11,5)
				resolve({
					status: "OK",
					hours: hours
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},

	/*           MAPPERS            */
	
	async getProjectsByUserID(userID){
		return new Promise(function(resolve, reject){
			var res = client.get("/api/project/getProjects/userID/" + userID);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				var models = response.data.projects;
				var projects = []
				for (var i = 0; i < models.length; i++){
					var model = models[i];
					projects.push(new Project(model.projectID, model.title, model.summary, model.ownerID, model.deleted));
				}
				resolve({
					status: "OK",
					projects: projects
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	/*
		PROJECTS
	*/

	async createProject(userID, title, summary){
		return new Promise(function(resolve, reject){
			var res = client.post("/api/project/create", {
				ownerID: userID,
				title: title,
				summary: summary,
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
					project: new Project(model.id, model.title, model.summary, model.ownerID, model.deleted)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async updateProject(project){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/project/update/"+project.id, project);
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
					project: new Project(model.id, model.title, model.summary, model.ownerID, model.deleted)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async deleteProject(project){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/project/delete/"+project.id);
			res.then(function(response){
				var code = response.data.code;
				if (code !== "OK"){
					reject({
						status: "BAD",
						error: code
					});
					return;
				}
				resolve({
					status: "OK"
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	},
	async addUser(username, projectID){
		return new Promise(function(resolve, reject){
			var res = client.put("/api/project/addUser/username/"+username+"/projectID/"+projectID);
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
					user: new User(model.id, model.username, model.password, model.firstName, model.lastName)
				})
				return;
			}).catch(function(e){
				return e;
			});
		});
	}
}