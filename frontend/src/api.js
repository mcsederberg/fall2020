// import vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://18.218.126.54:3000',
  json: true,
  headers: {
	"Content-type": "application/json"
  }
})
// const Vue = vue;

export default {
	//User
	// async register(user){
	// 	return client.post(`/api/register`, user.toJSON());
	// },
	async register(user){
		var res =  client.post("/api/register/name/"+user.name+"/username/"+user.username+"/password/"+user.password);	
		console.log("Res: " + res);
		return res;
	},
	async login(user){
		var res =  client.post("/api/login/username/"+user.username+"/password/"+user.password);	
		console.log("Res: " + res);
		return res;
	}
	
}