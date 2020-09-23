
<template>
	<div class="w-full h-full flex">
		<div v-if="screen === 'main'" class="flex flex-col border m-auto w-64 h-64">
			<button @click="setScreen('login')"    class="mt-auto mx-auto w-1/2 border mb-3">Login</button>
			<button @click="setScreen('register')" class="mb-auto mx-auto w-1/2 border">Register</button>
		</div>
		<div v-else-if="screen === 'login'" class="flex flex-col border m-auto px-5 py-2">
			<p class="self-center">Login</p>
			<div class="my-1"><label for="loginUsername">Username: </label><input id="loginUsername" v-model="loginUsername" class="text-dark"/></div>
			<div class="my-1"><label for="loginPassword">Password: </label><input id="loginPassword" v-model="loginPassword" type="password" class="text-dark"/></div>
			<button class="border" @click="login">Login</button>
		</div>
		<div v-else-if="screen === 'register'" class="flex flex-col border m-auto px-5 py-2">
			<p class="self-center">Register</p>
			<div class="my-1"><label for="registerName">Name: </label><input id="registerName" v-model="registerName" class="text-dark"/></div>
			<div class="my-1"><label for="registerUsername">Username: </label><input id="registerUsername" v-model="registerUsername" class="text-dark"/></div>
			<div class="my-1"><label for="registerPassword">Password: </label><input id="registerPassword" v-model="registerPassword" type="password" class="text-dark"/></div>
			<button class="border" @click="register">Register</button>
		</div>
	</div>
</template>

<script>
// import api from '@/api'
import User from '../models/User'
export default {
	name: 'Login',
	components: {
	},
	data: function(){
		return{
			screen: 'main',
			loginUsername: "",
			loginPassword: "",
			registerName: "",
			registerUsername: "",
			registerPassword: "",
		}
	},
	methods: {
		setScreen: function(type){
			this.screen = type;  
		},
		login: function(){
			var user = new User(this.loginUsername, this.loginPassword, "");
			user.login();
		},
		register: function(){
			var user = new User(this.registerUsername, this.registerPassword, this.registerName);
			user.register();
		}
	}
}
</script>

