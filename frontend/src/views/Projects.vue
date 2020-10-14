<template>
<div class="w-full h-full bg-lightBlue" >
    <div class="w-2/3 mx-auto h-full bg-darkBlue border-orange border-l-8 border-r-8">
		<i @click="showPopup = true" class="fa fa-plus text-orange float-right cursor-pointer relative" style="right: 15px; top: 15px; font-size: 35px;"/>
		<div class="w-full h-full flex flex-col">
			<div v-for="project in projects" :key="project.id"  @click="openProject(project.id)" class="flex flex-col self-center w-2/3 my-3 p-4 bg-header cursor-pointer border-4 border-darkBlue hover:border-gray">
				<p class="text-center text-lg">{{project.title}}</p>
			</div>
		</div>


		<Popup v-if="showPopup" id="newProjectPopup" @closed="showPopup = false" title="New Project">
			<div class="my-1"><label for="newTitle">Title: </label><input id="newTitle" v-model="newProject.title" class="ml-2 px-1 float-right text-dark"/></div>
			<div class="my-1"><label for="newSummary">Summary: </label><input id="newSummary" v-model="newProject.summary" class="ml-2 px-1 float-right text-dark"/></div>
			<div class="self-center border padding-2 cursor-pointer" @click="createProject">Create</div>
			<!--Todo, add members to the project-->
		</Popup>
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
	mounted: function(){
		this.getAllProjects();
	},
	methods: {
		createProject: function() {

		},
		getAllProjects: function(){
			var vue = this;
            var res = Project.getUserProjects(this.$root.$data.user.id);
            res.then(function(response){
                vue.projects = response;
            }).catch(function(e){
				var code = e.error;
				console.log(code);
            });
		},
		openProject: function(id) {
			this.$root.$data.project = this.projects.find(project => project.id == id);
			this.$router.push('/tasks');
		}
	}
}
</script>

