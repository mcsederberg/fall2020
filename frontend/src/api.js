import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://18.218.126.54:3000/',
  json: true
})

export default {
	async execute (method, resource, data) {
		// inject the accessToken for each request
		let accessToken = await Vue.prototype.$auth.getAccessToken()
		return client({
			method,
			url: resource,
			data,
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then(req => {
			return req.data
		})
	},
	//User
	createUser(data){
		return this.execute('post','/posts', data);
	},
	readUser(id){
		return this.execute('get',`/gets/${id}`);
	},
	updateUser(id, data){
		return this.execute('put', `/posts/${id}`, data);
	},
	deleteUser(id){
		return this.execute('delete', `/posts/${id}`);
	},
	
}