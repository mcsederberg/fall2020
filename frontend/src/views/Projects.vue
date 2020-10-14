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

</div>
</template>

<script>
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

		}
	}
}
</script>

