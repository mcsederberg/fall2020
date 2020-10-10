import api from '@/api'

export default class Hour {
	constructor(hourID, time, userID, parentID, parentType="project"){
		this.hourID = hourID;
		this.time = time;
		this.userID = userID;
		this.parentID = parentID;
		this.parentType = parentType;
	}
	static async createHour(userID, parentID, parentType){
        return new Promise(function(resolve, reject){
            var res = api.createHours(userID, parentID, parentType);
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