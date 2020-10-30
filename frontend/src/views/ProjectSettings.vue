<template>
   <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8" style="min-height: 100%">
            <div class="w-full flex flex-col">
				<div class="flex w-3/4 bg-header self-center mt-6 p-6 text-xlg">Title <input v-model="project.title" class="px-2 ml-2 text-dark w-full bg-lightBlue"/></div>
				<div class="flex flex-col w-3/4 bg-header self-center mt-6 p-6 text-xlg">Description <textarea v-model="project.summary" class="px-2 text-dark w-full bg-lightBlue"/></div>
				<div class="flex flex-col w-3/4 bg-header self-center mt-6 p-6 text-xlg">
					Add Members by username
					<div class="flex self-center w-full"> <input v-model="newUsername" class="w-full text-dark mr-3 bg-lightBlue"/><button class="bg-orange px-3 text-darkBlue"  @click="addUser">Add</button></div>
					<div class="border mt-4 p-2">
						<u>Current members:</u> 
						<div v-for="user in users" :key='user.id'>
							{{user.firstName}} {{user.lastName}} <i v-if="isOwner && user.id != currentUser.id" @click="removeUser(user.id)" class="cursor-pointer fa fa-remove"/>
						</div>
					</div>
				</div>
				<div class="flex mx-auto mt-5 w-3/4 justify-end">
					<button v-if="isOwner" class="rounded-lg ml-3 bg-lightBlue px-3 text-darkBlue text-lg ml-auto" @click="deleteProject">Delete Project</button>
					<button class="rounded-lg ml-3 bg-green px-3 text-lg text-darkBlue" @click="saveProject">Save</button>
				</div>
            </div>
        </div>
    </div>
</template>

<script>
import  Cookies from '../mixins/Cookies'
import User from '../models/User';
import Project from '../models/Project';
export default {
	name: 'ProjectSettings',
	components: {
	},
	data: function(){
		return{
			currentUser: {},
			project: {
				title: ''
			},
			users: [],
			newUsername: "",
			isOwner: false
		}
	},
	mounted: function(){
		this.currentUser = Cookies.getUser();
		this.project = Cookies.getProject();
		this.getUsersForProject();
		if (this.project.ownerID === this.currentUser.id){
			this.isOwner = true;
		}
	},
	methods: {
		saveProject: function(){
			let vue = this;
			var res = this.project.update();
			res.then(function(response){
				vue.project = response;
				Cookies.setCookie("project", JSON.stringify(response), "1");
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		saveTitle: function(){
			let vue = this;
			var res = this.project.update();
			res.then(function(response){
				vue.project = response;
				Cookies.setCookie("project", JSON.stringify(response), "1");
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		addUser: function(){
			let vue = this;
			var res = Project.addUser(this.newUsername, this.project.id);
			res.then(function(response){
				vue.users.append(response);
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		removeUser: function(){

		},
		deleteProject: function(){
			let vue = this;
			var res = this.project.delete();
			res.then(function(){
				Cookies.deleteCookie("project");
				vue.$router.push('/projects');
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		getUsersForProject: function(){
			let vue = this;
			var res = User.getUsersForProject(this.project.id);
			res.then(function(response){
				vue.users = response;
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		}
	}
}
</script>

