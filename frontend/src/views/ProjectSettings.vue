<template>
   <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8 h-full">
            <div class="w-full flex flex-col">
                <div class="flex mx-auto mt-4 mb-5">
                    <div class="text-xxxlg">Edit Settings for {{project.title}}</div>
                </div>

				<div class="flex self-center"><span class="text-xxlg">Change name: </span> <input v-model="project.title" class="ml-2 text-dark"/><button class="ml-3 bg-orange px-3"  @click="saveTitle">Save Title</button></div>
				<div class="flex flex-col self-center">
					<span class="text-xxlg">Current Users:</span>
					<div v-for="user in users" :key='user.id'>
						{{user.firstName}} {{user.lastName}} <i v-if="isOwner && user.id != currentUser.id" @click="removeUser(user.id)" class="cursor-pointer fa fa-remove"/>
					</div>
				</div>
				<div class="flex self-center"><span class="text-xxlg">Add user by username: </span> <input v-model="newUsername" class="ml-2 text-dark"/><button class="ml-3 bg-orange px-3"  @click="addUser">Add User</button></div>
				<button v-if="isOwner" @click="deleteProject">DELETE PROJECT</button>
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

