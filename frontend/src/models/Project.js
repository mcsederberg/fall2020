import api from '../api'

export default class Project {
    constructor(id, title, summary, ownerID, deleted) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.ownerID = ownerID;
        this.deleted = deleted;
    }
    
	static async getUserProjects(userID){
        return new Promise(function(resolve, reject){
            var res = api.getProjectsByUserID(userID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.projects);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async createProject(title, summary, userID) {
        return new Promise(function(resolve, reject){
            var res = api.createProject(userID, title, summary);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.project);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async addUser(username, projectID) {
        return new Promise(function(resolve, reject){
            var res = api.addUser(username, projectID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.user);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    async update(){
        var obj = this;
        return new Promise(function(resolve, reject){
            var res = api.updateProject(obj);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.project);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    async delete(){
        var obj = this;
        return new Promise(function(resolve, reject){
            var res = api.deleteProject(obj);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.project);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    toJSON(){
        return {
            id: this.id,
            title: this.title,
            summary: this.summary,
            ownerID: this.ownerID,
            deleted: this.deleted
        }
    }
}