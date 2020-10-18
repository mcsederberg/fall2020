import api from '@/api'

export default class User {
	constructor(id, username, password, firstName, lastName){
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.id = id;
	}
	static getUser(id){
		return api.getUser(id);
	}
	static async login(username, password){
		return new Promise(function(resolve, reject){
			var res = api.login(username, password);
			res.then(function(response){
				if (response.status !== "OK"){
					reject();
					return
				}
				resolve(response.user);
			}).catch(function(e){
				reject(e);
			});
		})
	}
	static async register(username, password, firstName, lastName){
		return new Promise(function(resolve, reject){
			var res = api.register(username, password, firstName, lastName);
			res.then(function(response) {
				if (response.status !== "OK"){
					console.error("Something terrible has happened");
					reject();
					return;
				}
				resolve(response.user);
				return;
			}).catch(function(e) {
				reject(e);
			});
		});
	}
	toJSON(){
		return {
			username: this.username,
			firstName: this.firstName,
			lastName: this.lastName,
			password: this.password,
			id: this.id,
		}
	}
}