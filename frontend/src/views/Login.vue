
<template>
	<div class="w-full h-full flex">
		<div v-if="screen === 'main'" class="flex flex-col border m-auto w-64 h-64">
			<button @click="setScreen('login')"    class="mt-auto mx-auto w-1/2 border mb-3">Login</button>
			<button @click="setScreen('register')" class="mb-auto mx-auto w-1/2 border">Register</button>
		</div>
		<div v-else-if="screen === 'login'" class="flex flex-col border m-auto px-5 py-2">
			<div class="flex"><p @click="reset" class="cursor-pointer">Back</p><p class="self-center mx-auto">Login</p></div>
			<div class="my-1"><label for="loginUsername">Username: </label><input id="loginUsername" v-model="loginUsername" class="ml-2 px-1 float-right text-dark"/></div>
			<div class="my-1"><label for="loginPassword">Password: </label><input id="loginPassword" v-model="loginPassword" type="password" class="ml-2 px-1 float-right text-dark"/></div>
			<button class="border" @click="login">Login</button>
		</div>
		<div v-else-if="screen === 'register'" class="flex flex-col border m-auto px-5 py-2">
			<div class="flex"><p @click="reset" class="cursor-pointer">Back</p><p class="self-center mx-auto">Register</p></div>
			<div class="my-1"><label for="registerFirstName">First name: </label><input id="registerFirstName" v-model="registerFirstName" class="ml-2 px-1 float-right text-dark"/></div>
			<div class="my-1"><label for="registerLastName">Last name: </label><input id="registerLastName" v-model="registerLastName" class="ml-2 px-1 float-right text-dark"/></div>
			<div class="my-1"><label for="registerUsername">Username: </label><input id="registerUsername" v-model="registerUsername" class="ml-2 px-1 float-right text-dark"/></div>
			<div class="my-1"><label for="registerPassword">Password: </label><input id="registerPassword" v-model="registerPassword" type="password" class="ml-2 px-1 float-right text-dark"/></div>
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
			registerFirstName: "",
			registerLastName: "",
			registerUsername: "",
			registerPassword: "",
		}
	},
	mounted: function(){
	},
	methods: {
		reset: function(){
			this.screen = 'main';
			this.loginUsername = "";
			this.loginPassword = "";
			this.registerPassword = "";
			this.registerUsername = "";
			this.registerLastName = "";
			this.registerFirstName = "";
		},
		setScreen: function(type){
			this.screen = type;  
		},
		login: function(){
			if (this.loginUsername == "" || this.loginPassword == ""){
				alert("You must fill in all of the fields");
				return;
			}
			var res = User.login(this.loginUsername, this.loginPassword);
			var vue = this;
			res.then(function(response){
				vue.$root.$data.user = response;
				window.location.href = "/projects";
			}).catch(function(e){
				var code = e.error;	
				switch (code){
					case "INCORRECT_PASSWORD":
						alert("Incorrect password");
						break;
					case "INVALID_USERNAME":
						alert("Invalid username");
						break;
				}
			});
		},
		register: function(){
			var vue = this;
			if (this.registerFirstName == "" || this.registerLastName == "" || this.registerUsername == "" || this.registerPassword == ""){
				alert("You must fill in all of the fields");
				return;
			}
			var res = User.register(this.registerUsername, this.registerPassword, this.registerFirstName, this.registerLastName);
			res.then(function(response){
				vue.$root.$data.user = response;
				window.location.href = "/projects";
			}).catch(function(e){
				var code = e.error;
				switch (code){
					case "ER_DUP_ENTRY":
						alert("That username is taken");
						break;
				}
			});
		}
	}
}
</script>

