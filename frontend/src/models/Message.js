import api from '../api'

export default class Message {
    constructor(messageID, projectID, content, userID, timePublished, editDate, priority, deleted) {
        let importance = priority == 'true' || priority == true ? true : false;
        this.messageID = messageID;
		this.projectID = projectID;
        this.content = content;
        this.userID = userID;
        this.timePublished = timePublished;
        this.editDate = editDate;
        this.priority = importance;
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
				resolve(response.message);
				return;
			}).catch(function(e) {
				reject(e);
			});
		});
    }
    async updateMessage(){
        var model = this;
        return new Promise(function(resolve, reject){
			var res = api.updateMessage(model.messageID, model.projectID, model.userID, model.content, model.timePublished, model.editDate, model.priority, model.deleted);
			res.then(function(response) {
				if (response.status !== "OK"){
					console.error("Something terrible has happened");
					reject();
					return;
				}
				resolve(response.message);
				return;
			}).catch(function(e) {
				reject(e);
			});
		});
    }
    setDeleted(deleted){
        this.deleted = deleted;
    }
    // setEditDate(editDate){
    //     this.editDate = editDate;
    // }
    togglePriority(){
        this.priority = !this.priority;
    }
    setEditDate(){
        this.editDate = Date.now();
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