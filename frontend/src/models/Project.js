import api from '@/api'

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