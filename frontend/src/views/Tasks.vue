sele<template>
    <div class="w-full h-full">
        <i @click="showPopup=true" style="right: 50px; top: 75px; font-size: 35px;" class="fa fa-plus absolute text-primary-alt cursor-pointer"/>
        <div class="w-full h-full flex flex-col">
            <div v-for="(task, index) in allTasks" :key="index" class="flex flex-col self-center w-3/4 border my-3 px-8">
                <div class="taskHeader flex justify-between">
                    Task <p class="text-center">{{task.title}}</p><p class="float-right">Due: {{task.dueDate}}  <i class="fa fa-times cursor-pointer" @click="deleteTask(task.id)"/></p>
                </div>
                <div class="taskHours flex justify-between">
                    Hours: TODO
                    <div class="flex border p-1"><p class="cursor-pointer">IN</p>/<p class="cursor-pointer">OUT</p></div>
                </div>
                <div class="taskDescription">
                    Description:
                    <br>
                    {{task.summary}}
                </div>
            </div>
        </div>



        <div v-if="showPopup" id="newTaskPopup" class="flex flex-col absolute border p-5" style="left: 45%; top: 20%;">
            <div class="flex">
                <i @click="showPopup=false" class="fa fa-remove"/> <p class="self-center mx-auto">New Task</p>
            </div>
            <div class="my-1"><label for="newTitle">Title: </label><input id="newTitle" v-model="newProject.title" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newSummary">Summary: </label><input id="newSummary" v-model="newProject.summary" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newStartDate">StartDate: </label><input id="newStartDate" v-model="newProject.startDate" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newDueDate">Due Date: </label><input id="newDueDate" v-model="newProject.dueDate" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newCompletedDate">Completed Date: </label><input id="newCompletedDate" v-model="newProject.completedDate" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newStatus">Status: </label>
                <select class="text-dark float-right" v-model="newProject.status">
                    <option default class="text-dark" value="open">Open</option>
                    <option class="text-dark" value="closed">Closed</option>
                </select>
            </div>
            <div class="self-center border padding-2" @click="createTask">Create</div>
        </div>
    </div>
</template>

<script>
// import api from '@/api'
// import User from '../models/User'
import Task from '../models/Task';
export default {
	name: 'Tasks',
	components: {
	},
	data: function(){
		return{
            showPopup: false,
            newProject: {
                title: "",
                summary: "",
                dueDate: "",
                completedDate: "",
                status: "",
                percentComplete: "60",
                startDate: "",
                deleted: false,
            },
            allTasks: []
		}
	},
	mounted: function(){
        this.$root.$data.project = {id: "12345678911"};
        this.$root.$data.user = {id: "b8dca12f9a28"}

        this.getAllTasks();
	},
	methods: {
        createTask: function(){
            if (this.newProject.title == "" 
            || this.newProject.summary == "" 
            || this.newProject.dueDate == "" 
            || this.newProject.status == ""
            || this.newProject.startDate == ""){
				alert("You must fill in all of the fields");
				return;
			}
			var res = Task.createTask(this.$root.$data.user.id, this.$root.$data.project.id, this.newProject.title, this.newProject.summary, this.newProject.dueDate, this.newProject.startDate, this.newProject.completedDate, this.newProject.status, this.newProject.percentComplete);
			var vue = this;
			res.then(function(response){
				vue.allTasks.push(response);
			}).catch(function(e){
				var code = e.error;	
				switch (code){
                    default:
					// case "INCORRECT_PASSWORD":
					// 	alert("Incorrect password");
					// 	break;
					// case "INVALID_USERNAME":
					// 	alert("Invalid username");
					// 	break;
				}
			});
        },
        getAllTasks: function(){
            var vue = this;
			var res = Task.getTasksForProjectID(this.$root.$data.project.id);
			res.then(function(response){
                vue.allTasks = response;
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
        },
        deleteTask: function(taskID){
            var vue = this;
			var res = Task.deleteTask(taskID);
			res.then(function(){
                vue.allTasks = vue.allTasks.filter(function(task){
                    return task.id !== taskID;
                });
			}).catch(function(e){
				var code = e.error;
				switch (code){
                    default:
					// case "ER_DUP_ENTRY":
					// 	alert("That username is taken");
					// 	break;
				}
			});
        },
	}
}
</script>

