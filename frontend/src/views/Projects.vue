<template>
<div>
	<div v-for="project in projects" :key="project.projectID">
	</div>
	<div @click="showPopup = true">
		<i class="fa fa-plus"/>
		New Project
	</div>
	
	<Popup v-if="showPopup" id="newProjectPopup" @closed="showPopup = false" title="New Project">
		<div class="my-1"><label for="newTitle">Title: </label><input id="newTitle" v-model="newProject.title" class="ml-2 px-1 float-right text-dark"/></div>
		<div class="my-1"><label for="newSummary">Summary: </label><input id="newSummary" v-model="newProject.summary" class="ml-2 px-1 float-right text-dark"/></div>
		<div class="self-center border padding-2" @click="createProject">Create</div>
		<!--Todo, add members to the project-->
	</Popup>
	<!--Michaels below-->

	<div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8">
            <i @click="createProjectPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full h-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg">My Projects</div>
                </div>
                <div v-for="(Project, index) in allProjects" :key="index" class="flex flex-col self-center w-1/2 border my-3 p-4 bg-header">
                    <i class="fa fa-times cursor-pointer ml-auto" @click="deleteProject(Project.id)"/>
                    <div class="ProjectHeader flex justify-between items-center mt-2">
                        <p class="text-center text-lg">{{Project.title}}
                            <i class="far fa-edit cursor-pointer text-teal" @click="editActivityPopup(Project)"/>
                        </p>
                    </div>
                    <div class="ProjectDescription ml-3 mt-3">
                        {{Project.summary}}
                    </div>
                    <div class="self-end bg-orange rounded-lg cursor-pointer mt-1 py-1 px-3">Mark Complete</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Project from '../models/Project'
import Popup from '../components/Popup'
export default {
	name: 'Projects',
	components: {
		Popup: Popup
	},
	data: function(){
		return{
			projects: [],
			showPopup: false,
			newProject: {}
		}
	},
	computed: {
	},
	mounted: function(){
		this.getAllProjects();
	},
	methods: {
		getAllProjects: function() {
			// var vue = this;
			//todo need to update models/Project.js and also write a query to get projects of a user by joining ProjectUsers and Projects

			// var res = Project.getProjectsForUser(this.$root.$data.user.id);
			// res.then(function(response){
            //     vue.projects = response;
			// }).catch(function(e){
            //     var code = e.error;
            //     console.log(code)
			// 	// switch (code){
            //         // default:
			// 		// case "ER_DUP_ENTRY":
			// 		// 	alert("That username is taken");
			// 		// 	break;
			// 	// }
			// });
		},
		createProject: function() {
		},
		getAllProjectsMichael: function(){
			var vue = this;
            var res = Project.getUserProjects(this.$root.$data.user.id);
            res.then(function(response){
                vue.allProjects = response;
                vue.showPopup = false;
            }).catch(function(e){
                var code = e.error;
                switch (code){
                    default:
                    // case "ER_DUP_ENTRY":
                    // 	alert("That username is taken");
                    // 	break;
                }
            });
		}
	}
}
</script>

