// import api from '@/api'

export default class Hour {
	constructor(hourID, time, userID, parentID, parentType="project"){
		this.hourID = hourID;
		this.time = time;
		this.userID = userID;
		this.parentID = parentID;
		this.parentType = parentType;
	}
	toJSON(){
		return {
			hourID: this.hourID,
			time: this.time,
			userID: this.userID,
			parentID: this.parentID,
			parentType: this.parentType
		}
	}
}