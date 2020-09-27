import api from '@/api'

export default class Project {
    constructor(title, summary, ownerID, deleted) {
        this.title = title;
        this.summary = summary;
        this.ownerID = ownerID;
        this.deleted = deleted;
    }
    toJSON(){
        return {
            title: this.title,
            summary: this.summary,
            ownerID: this.ownerID,
            deleted: this.deleted
        }
    }
}