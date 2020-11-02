import api from '@/api'

export default class Task {
    constructor(id, userID, userFirstName, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete, deleted) {
        this.id = id;
        this.userID = userID;
        this.userFirstName = userFirstName;
        this.projectID = projectID;
        this.title = title;
        this.summary = summary;
        this.dueDate = dueDate;
        this.startDate = startDate;
        this.completedDate = completedDate;
        this.status = status;
        this.percentComplete = percentComplete;
        this.deleted = deleted;
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
    static async createTask(userID, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete){
        return new Promise(function(resolve, reject){
            var res = api.createTask(userID, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete);
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
    static async updateTask(taskID, userID, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete){
        return new Promise(function(resolve, reject){
            var res = api.updateTask(taskID, userID, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete);
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
        var completeDate = this.SQLNow();
        return new Promise(function(resolve, reject){
            var res = api.completeTask(taskID, completeDate);
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
        return new Task("", this.userID, this.userFirstName, this.projectID, this.title, this.summary, this.dueDate, this.startDate, this.completedDate, this.status, this.percentComplete, this.deleted);
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
            status: this.status,
            percentComplete: this.percentComplete,
            deleted: this.deleted
        }
    }
}