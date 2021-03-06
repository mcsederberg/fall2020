import api from '../api'

export default class Task {
    constructor(id, userID, projectID, title, summary, dueDate, startDate, completedDate, percentComplete, parentID, deleted, userFirstName) {
        this.id = id;
        this.userID = userID;
        this.projectID = projectID;
        this.title = title;
        this.summary = summary;
        this.dueDate = dueDate;
        this.startDate = startDate;
        this.completedDate = completedDate;
        this.percentComplete = percentComplete;
        this.deleted = deleted;
        this.userFirstName = userFirstName;
        this.parentID = parentID;
    }
    static getTask(id){
        return api.getTask(id);
    }
    static async getTasksForProjectID(projectID, userID = undefined){
        return new Promise(function(resolve, reject){
            var res = ""
            if (userID) {
                res = api.getTasksForUserAndProject(projectID, userID);
            }
            else {
                res = api.getTasksForProjectID(projectID);
            }
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.tasks);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async getSortedTasksForProjectID(projectID){
        return new Promise(function(resolve, reject){
            var res = api.getSortedTasksForProjectID(projectID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.tasks);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async createTask(userID, projectID, title, summary, dueDate, startDate, completedDate, percentComplete, parentID){
        return new Promise(function(resolve, reject){
            var res = api.createTask(userID, projectID, title, summary, dueDate, startDate, completedDate, percentComplete, parentID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.task);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async updateTask(taskID, projectID, userID, title, summary, dueDate, startDate, completedDate, percentComplete, parentID){
        return new Promise(function(resolve, reject){
            var res = api.updateTask(taskID, projectID, userID, title, summary, dueDate, startDate, completedDate, percentComplete, parentID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.task);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async completeTask(taskID){
        var completedDate = this.SQLNow();
        return new Promise(function(resolve, reject){
            var res = api.completeTask(taskID, completedDate);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.completedDate);
            }).catch(function(e){
                reject(e);
            });
        });
    }
	static SQLNow(){
		return (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
	}
    static async deleteTask(taskID){
        return new Promise(function(resolve, reject){
            var res = api.deleteTask(taskID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve("OK");
            }).catch(function(e){
                reject(e);
            });
        });
    }
    duplicate(){
        return new Task("", this.userID, this.userFirstName, this.projectID, this.title, this.summary, this.dueDate, this.startDate, this.completedDate, this.status, this.percentComplete, this.parentID, this.deleted);
    }
    toJSON(){
        return {
            id: this.id,
            userID: this.userID,
            projectID: this.projectID,
            title: this.title,
            summary: this.summary,
            dueDate: this.dueDate,
            startDate: this.startDate,
            completedDate: this.completedDate,
            percentComplete: this.percentComplete,
            parentID: this.parentID,
            deleted: this.deleted
        }
    }
}