<template>
<div class="w-full h-full bg-lightBlue" >
    <div class="w-2/3 mx-auto h-full bg-darkBlue border-orange border-l-8 border-r-8">
		<i @click="showPopup = true" class="fa fa-plus text-orange float-right cursor-pointer relative" style="right: 15px; top: 15px; font-size: 35px;"/>
		<div class="w-full flex flex-col">
			<div v-for="project in projects" :key="project.id"  @click="openProject(project.id)" class="flex flex-col self-center w-2/3 my-3 p-4 bg-header cursor-pointer border-4 border-darkBlue hover:border-gray">
				<p class="text-center text-lg">{{project.title}}</p>
				<div class="border-t my-2"/>
				<p class="text-center">{{project.summary}}</p>
			</div>
		</div>


		<Popup v-if="showPopup" id="newProjectPopup" @closed="showPopup = false" title="New Project">
			<div class="my-4"><label for="newTitle">Title: </label><input id="newTitle" v-model="newProject.title" class="ml-2 px-1 float-right bg-darkBlue border"/></div>
			<div class="my-4"><label for="newSummary">Summary: </label><input id="newSummary" v-model="newProject.summary" class="ml-2 px-1 float-right bg-darkBlue border"/></div>
			<div class="float-right px-4 py-2 self-center border padding-2 cursor-pointer" @click="createProject">Create</div>
			<!--Todo, add members to the project-->
		</Popup>
	</div>
</div>
</template>

<script>
import Project from '../models/Project';
import User from '../models/User';
import Popup from '../components/Popup';
import Cookies from '../mixins/Cookies'
export default {
	name: 'Projects',
	components: {
		Popup: Popup
	},
	data: function(){
		return{
			projects: [],
			showPopup: false,
			newProject: {},
			project: {}
		}
	},
	mounted: function(){
		this.user = Cookies.getUser();
		this.getAllProjects();
	},
	methods: {
		createProject: function() {
			let vue = this;
			var res = Project.createProject(this.newProject.title, this.newProject.summary, this.user.id);
            res.then(function(response){
				console.log(response);
				vue.projects.unshift(response);
				vue.newProject = {};
				vue.showPopup = false;
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		getAllProjects: function(){
			var vue = this;
            var res = Project.getUserProjects(this.user.id);
            res.then(function(response){
                vue.projects = response;
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		openProject: function(id) {
			var project = this.projects.find(project => project.id == id);
			Cookies.setProject(project);
			this.project = project;
			this.getUsersForProject();
		},
		getUsersForProject: function(){
			let vue = this;
			var res = User.getUsersForProject(this.project.id);
			res.then(function(response){
				// vue.users = response;
				Cookies.setUsers(response);
				vue.$emit("updateProject");
				vue.$router.push('/mytasks');
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		}
	}
}
</script>

