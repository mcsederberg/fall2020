import api from '@/api'

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