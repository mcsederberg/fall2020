import api from '@/api'

export default class Hour {
	constructor(hourID, userID, parentID, parentType="project", clockedIn, clockedOut=null){
		this.hourID = hourID;
		this.clockedIn = clockedIn;
		this.clockedOut = clockedOut;
		this.userID = userID;
		this.parentID = parentID;
		this.parentType = parentType;
	}
	static async clockIn(userID, parentID, parentType){
        return new Promise(function(resolve, reject){
            var res = api.clockIn(userID, parentID, parentType);
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
	static async clockOut(hourID){
        return new Promise(function(resolve, reject){
            var res = api.clockOut(hourID);
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
			clockedIn: this.clockedIn,
			clockedOut: this.clockedOut,
			userID: this.userID,
			parentID: this.parentID,
			parentType: this.parentType
		}
	}
}