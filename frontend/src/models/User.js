import api from '@/api'

export default class User {
	constructor(username, password, name=null){
		this.name = name;
		this.username = username;
		this.password = password;
	}
	// static getUser(id){
	//     return api.getUser(id);
	// }
	login(){
		api.login(this);
	}
	register(){
		api.register(this);
	}
	toJSON(){
		return {
			username: this.username,
			name: this.name,
			password: this.password
		}
	}
}