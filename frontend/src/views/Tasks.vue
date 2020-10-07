sele<template>
    <div class="w-full h-full">
        <i @click="createTaskPopup()" style="right: 50px; top: 75px; font-size: 35px;" class="fa fa-plus absolute text-primary-alt cursor-pointer"/>
        <div class="w-full h-full flex flex-col">
            <div class="flex w-1/2 mx-auto mt-4">
                <div class="text-lg">My Tasks</div>
                <div class="taskHours flex justify-between ml-auto">
                    <p class="self-center mr-4">Hours: {{projectHours}}</p>
                    <div class="flex"><p class="cursor-pointer border px-6 py-1 rounded-l-lg" @click="clockIn()">in</p><p class="cursor-pointer border px-6 py-1 rounded-r-lg" @click="clockOut()">out</p></div>
                </div>
            </div>
            <div v-for="(task, index) in allTasks" :key="index" class="flex flex-col self-center w-1/2 border my-3 p-4">
             <i class="fa fa-times cursor-pointer ml-auto" @click="deleteTask(task.id)"/>
                <div class="taskHeader flex justify-between">
                    <p class="text-center text-lg">{{task.title}}  <i class="far fa-edit cursor-pointer" @click="editActivityPopup(task)"/></p><p class="float-right">Due: {{prettyDate(task.dueDate)}}</p>
                </div>
                <div class="taskDescription ml-2">
                    {{task.summary}}
                </div>
            </div>
        </div>



        <div v-if="showPopup" id="newTaskPopup" class="flex flex-col absolute border p-5 bg-action" style="left: 45%; top: 20%;">
            <div class="flex">
                <i @click="showPopup=false" class="fa fa-remove cursor-pointer"/> <p class="self-center mx-auto">{{popupType == ACTIVITY_CREATE? 'New Task' : 'Update Task'}}</p>
            </div>
            <div class="my-1"><label for="newTitle">Title: </label><input id="newTitle" v-model="popupTask.title" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newSummary">Summary: </label><input id="newSummary" v-model="popupTask.summary" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newStartDate">StartDate: </label><input id="newStartDate" v-model="popupTask.startDate" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newDueDate">Due Date: </label><input id="newDueDate" v-model="popupTask.dueDate" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newCompletedDate">Completed Date: </label><input id="newCompletedDate" v-model="popupTask.completedDate" class="ml-2 px-1 float-right text-dark"/></div>
            <div class="my-1"><label for="newStatus">Status: </label>
                <select class="text-dark float-right" v-model="popupTask.status">
                    <option default class="text-dark" value="open">Open</option>
                    <option class="text-dark" value="closed">Closed</option>
                </select>
            </div>
            <div class="self-center border p-2 cursor-pointer" @click="taskPopupFunction">{{popupType == ACTIVITY_CREATE? 'Create' : 'Update'}}</div>
        </div>
    </div>
</template>

<script>
import Task from '../models/Task';
export default {
	name: 'Tasks',
	components: {
	},
	data: function(){
		return{
            showPopup: false,
            popupTask: {
                title: "",
                summary: "",
                dueDate: "",
                completedDate: "",
                status: "",
                percentComplete: "60",
                startDate: "",
                deleted: false,
            },
            allTasks: [],
            projectHours: 0,
            popupType: null,
            ACTIVITY_CREATE: 0,
            ACTIVITY_EDIT: 1,
		}
	},
	mounted: function(){
        this.$root.$data.project = {id: "12345678911"};
        this.$root.$data.user = {id: "b8dca12f9a28"}

        this.getAllTasks();
	},
	methods: {
        SQLDateTime: function(date){
            if (date == ""){
                return "";
            }
            return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        },
        taskPopupFunction: function(){
            if (this.popupType === this.ACTIVITY_CREATE){
                this.createTask();
            } else {
                this.updateTask();
            }
        },
        editActivityPopup: function(taskInput){
            this.popupType = this.ACTIVITY_EDIT;
            var task = taskInput.duplicate();
            task.completedDate = this.popupDate(task.completedDate);
            task.dueDate = this.popupDate(task.dueDate);
            task.startDate = this.popupDate(task.startDate);
            this.popupTask = task;
            this.showPopup = true;
        },
        updateTask: function(){
            if (this.popupTask.title == "" 
            || this.popupTask.summary == "" 
            || this.popupTask.dueDate == "" 
            || this.popupTask.status == ""
            || this.popupTask.startDate == ""){
				alert("You must fill in all of the fields");
				return;
			}
			var res = Task.updateTask(
                this.popupTask.id, 
                this.$root.$data.user.id, 
                this.$root.$data.project.id,
                this.popupTask.title, 
                this.popupTask.summary,
                this.SQLDateTime(this.popupTask.dueDate), 
                this.SQLDateTime(this.popupTask.startDate), 
                this.SQLDateTime(this.popupTask.completedDate), 
                this.popupTask.status, 
                this.popupTask.percentComplete
            );
			var vue = this;
			res.then(function(response){
                for (var i in vue.allTasks) {
                    if (vue.allTasks[i].id == response.id) {
                        vue.$set(vue.allTasks, i, response);
                        break;
                    }
                }
                vue.showPopup = false;
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
        createTaskPopup: function(){
            this.popupType = this.ACTIVITY_CREATE;
            this.popupTask = {
                title: "",
                summary: "",
                dueDate: "",
                completedDate: "",
                status: "",
                percentComplete: "60",
                startDate: "",
                deleted: false,
            };
            this.showPopup = true;
        },
        createTask: function(){
            if (this.popupTask.title == "" 
            || this.popupTask.summary == "" 
            || this.popupTask.dueDate == "" 
            || this.popupTask.status == ""
            || this.popupTask.startDate == ""){
				alert("You must fill in all of the fields");
				return;
			}
            var res = Task.createTask(
                this.$root.$data.user.id, 
                this.$root.$data.project.id, 
                this.popupTask.title, 
                this.popupTask.summary, 
                this.SQLDateTime(this.popupTask.dueDate), 
                this.SQLDateTime(this.popupTask.startDate), 
                this.SQLDateTime(this.popupTask.completedDate), 
                this.popupTask.status, 
                this.popupTask.percentComplete
            );
			var vue = this;
			res.then(function(response){
				vue.allTasks.push(response);
                vue.showPopup = false;
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
        prettyDate: function(dateString){
            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            var date = new Date(dateString);
            var monthIndex = date.getMonth();
            var day = date.getDate();
            var year = date.getFullYear();
            return months[monthIndex] + " " + day + ", " + year;
        },
        popupDate: function(dateString){
            return new Date(dateString).toString("MMM dd yyyy");
        },
        clockIn: function(){

        },
        clockOut: function(){

        }
	}
}
</script>

