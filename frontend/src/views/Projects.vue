<template>
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
</template>

<script>
import Project from '../models/Project'
export default {
	name: 'Projects',
	components: {
	},
	data: function(){
		return{
            allProjects: [],

		}
	},
	mounted: function(){
		this.getAllProjects();
	},
	methods: {
		getAllProjects: function(){
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

