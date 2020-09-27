import api from '@/api'

export default class Task {
    constructor(userID, projectID, title, summary, dueDate, startDate, completedDate, status, percentComplete, deleted) {
        this.userID = userID;
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
    toJSON(){
        return {
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