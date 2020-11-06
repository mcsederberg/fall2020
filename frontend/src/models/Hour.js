import api from '../api'

export default class Hour {
	constructor(hourID, userID, parentID, parentType="project", clockedIn, clockedOut=null){
		this.hourID = hourID;
		this.clockedIn = clockedIn;
		this.clockedOut = clockedOut;
		this.userID = userID;
		this.parentID = parentID;
		this.parentType = parentType;
    }
    static async getClockedIn(userID, parentID){
        return new Promise(function(resolve, reject){
            var res = api.getClockedIn(userID, parentID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.clockedIn);
            }).catch(function(e){
                reject(e);
            });
        });
    }
    static async getHours(userID, parentID){
        return new Promise(function(resolve, reject){
            var res = api.getTimeForUser(userID, parentID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.hours);
            }).catch(function(e){
                reject(e);
            });
        });
    }
	static async clockIn(userID, parentID, parentType){
        var clockedIn = this.SQLNow();
        return new Promise(function(resolve, reject){
            var res = api.clockIn(userID, parentID, parentType, clockedIn);
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
	static async clockOut(userID, parentID){
        var clockedOut = this.SQLNow();
        return new Promise(function(resolve, reject){
            var res = api.clockOut(userID, parentID, clockedOut);
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
    static async getHoursForProject(projectID){
        return new Promise(function(resolve, reject){
            var res = api.getHoursForProject(projectID);
            res.then(function(response){
                if (response.status !== "OK"){
                    reject();
                    return;
                }
                resolve(response.hours);
            }).catch(function(e){
                reject(e);
            });
        });
    }
	static SQLNow(){
		return (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
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