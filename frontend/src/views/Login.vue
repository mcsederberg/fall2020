
<template>
	<div class="w-full h-full flex bg-darkBlue">
		<div class="absolute">
			<div id="decoration" class="top relative border-orange transform origin-center h-16 -rotate-45"></div>
		</div>
		<div class="absolute right-0 bottom-0 ">
			<div id="decoration" class="bottom relative border-orange transform origin-center h-16 -rotate-45"></div>
		</div>
		<div v-if="screen === 'main'" id="loginRegisterBox" class="text-lg flex flex-col m-auto bg-header">
			<button @click="setScreen('login')"    class="mt-auto mx-auto w-1/2 border mb-3">Login</button>
			<button @click="setScreen('register')" class="mb-auto mx-auto w-1/2 border">Register</button>
		</div>
		<div v-else-if="screen === 'login'" id="loginRegisterBox" class="flex flex-col justify-center text-md m-auto p-16 bg-header loginWidth">
			<img src="../../public/images/forklift-white.png" class="max-w-none w-24 self-center pb-10"/>
			<div class="flex"><i @click="reset" class="fa fa-arrow-left cursor-pointer"/></div>
			<div class="my-1 flex flex-col">
				<label for="loginUsername">Username: </label>
				<input id="loginUsername" v-model="loginUsername" class="px-1 float-right text-dark"/>
			</div>
			<div class="my-1 flex flex-col">
				<label for="loginPassword">Password: </label>
				<input id="loginPassword" @keyup.enter="login" v-model="loginPassword" type="password" class="px-1 float-right text-dark"/>
			</div>
			<button class="mt-3 bg-orange" @click="login">Login</button>
		</div>
		<div v-else-if="screen === 'register'" id="loginRegisterBox" class="flex flex-col justify-center text-md m-auto p-16 bg-header loginWidth">
			<img src="../../public/images/forklift-white.png" class="max-w-none w-24 self-center pb-10"/>
			<div class="flex"><i @click="reset" class="fa fa-arrow-left cursor-pointer"/></div>
			<div class="my-1 flex flex-col">
				<label for="registerFirstName">First name: </label>
				<input id="registerFirstName" v-model="registerFirstName" class="px-1 float-right text-dark"/>
			</div>
			<div class="my-1 flex flex-col">
				<label for="registerLastName">Last name: </label>
				<input id="registerLastName" v-model="registerLastName" class="px-1 float-right text-dark"/>
			</div>
			<div class="my-1 flex flex-col">
				<label for="registerUsername">Username: </label>
				<input id="registerUsername" v-model="registerUsername" class="px-1 float-right text-dark"/>
			</div>
			<div class="my-1 flex flex-col">
				<label for="registerPassword">Password: </label>
				<input id="registerPassword" v-model="registerPassword" type="password" class="px-1 float-right text-dark"/>
			</div>
			<button class="mt-3 bg-orange" @click="register">Register</button>
		</div>
	</div>
</template>

<style scoped>
#decoration {
	border-width: 24px;
	width: 28rem;
}
.top {
	top: 6rem;
	right: 20%;
}
.bottom {
	bottom: 6rem;
	left: 20%;
}

#loginRegisterBox {
	width: 30rem;
	height: 36rem;
}
</style>

<script>
// import api from '@/api'
import User from '../models/User'
import  Cookies from '../mixins/Cookies'
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
		var user = Cookies.getUser();
		if (user != ""){
			this.$router.push('/projects'); //do this instead of changing window href so it retains data
		}
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
				Cookies.setCookie("user",JSON.stringify(response), 2);
				vue.$router.push('/projects'); //do this instead of changing window href so it retains data
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
				Cookies.setCookie("user",JSON.stringify(response), 2);
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

