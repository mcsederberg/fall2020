import api from '../api'

export default class Message {
    constructor(projectID, content, userID, timePublished, editDate, priority, deleted) {
        this.projectID = projectID;
        this.content = content;
        this.userID = userID;
        this.timePublished = timePublished;
        this.editDate = editDate;
        this.priority = priority;
        this.deleted = deleted;
    }

    static async getMessages(projectID){
        return new Promise(function(resolve, reject){
			var res = api.getMessagesForProject(projectID);
			res.then(function(response) {
				if (response.status !== "OK"){
					console.error("Something terrible has happened");
					reject();
					return;
				}
				resolve(response.messages);
				return;
			}).catch(function(e) {
				reject(e);
			});
		});
    }
    static async createMessage(projectID, userID, content, timePublished, editDate, priority){
        return new Promise(function(resolve, reject){
			var res = api.createMessage(projectID, userID, content, timePublished, editDate, priority);
			res.then(function(response) {
				if (response.status !== "OK"){
					console.error("Something terrible has happened");
					reject();
					return;
				}
				resolve(response.messages);
				return;
			}).catch(function(e) {
				reject(e);
			});
		});
    }
    toJSON(){
        return {
            projectID: this.projectID,
            content: this.content,
            userID: this.userID,
            timePublished: this.timePublished,
            editDate: this.editDate,
            priority: this.priority,
            deleted: this.deleted
        }
    }
}