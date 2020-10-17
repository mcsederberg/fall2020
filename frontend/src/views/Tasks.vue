<template>
    <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8">
            <i @click="createTaskPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg">My Tasks</div>
                </div>
                <div v-for="(task, index) in sortedTasks" :key="index" class="flex flex-col self-center w-1/2 border my-3 p-4 bg-header">
                    <i class="fa fa-times cursor-pointer ml-auto" @click="deleteTask(task.id)"/>
                    <div class="taskHeader flex justify-between items-center mt-2">
                        <p class="text-center text-lg">{{task.title}}
                            <i class="far fa-edit cursor-pointer text-teal" @click="editActivityPopup(task)"/>
                        </p>
                        <p class="float-right">Due: {{prettyDate(task.dueDate)}}</p>
                    </div>
                    <div class="taskDescription ml-3 mt-3">
                        {{task.summary}}
                    </div>
                    <div v-if="task.status=='open'" class="self-end bg-orange rounded-lg cursor-pointer mt-1 py-1 px-3 " @click="markComplete(task)">Mark Complete</div>
                    <div v-else class="self-end bg-orange rounded-lg cursor-pointer mt-1 py-1 px-3 ">Completed</div>
                </div>
            </div>
        </div>


        <Popup v-if="showPopup" id="newTaskPopup" :title="popupType == ACTIVITY_CREATE? 'Add Task' : 'Update Task'" @closed="showPopup=false">
            <div class="flex flex-col">
                <div class="border px-3 pt-3">
                    <div class="flex flex-row">
                        <div class="my-1"><label for="newStartDate">Start Date: </label><input id="newStartDate" v-model="popupTask.startDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/></div>
                        <div class="my-1 ml-2"><label for="newDueDate">Due Date: </label><input id="newDueDate" v-model="popupTask.dueDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/></div>
                    </div>
                    <div class="my-1"><label for="newCompletedDate">Completed Date: </label><input id="newCompletedDate" v-model="popupTask.completedDate" class="ml-2 px-1 bg-darkBlue border w-32"/></div>
                    <div class="my-1 cursor-pointer"><label for="newStatus">Status: </label>
                        <select class="bg-darkBlue border" v-model="popupTask.status">
                            <option default class="bg-darkBlue border" value="open">In Progress</option>
                            <option class="bg-darkBlue border" value="closed">Completed</option>
                        </select>
                    </div>
                    <div class="my-1"><label for="newTitle">Title: </label><input id="newTitle" v-model="popupTask.title" class="ml-2 px-1 bg-darkBlue border"/></div>
                    <div class="my-1"><label for="newSummary">Description (Optional): </label><br><textarea id="newSummary" v-model="popupTask.summary" class="w-full px-1 bg-darkBlue border"/></div>
                </div>
                <div class="ml-auto mt-3 border p-2 cursor-pointer" @click="taskPopupFunction">{{popupType == ACTIVITY_CREATE? 'Create' : 'Update'}}</div>
            </div>
        </Popup>
    </div>
</template>

<script>
import Task from '../models/Task';
import Popup from '../components/Popup';
import Cookies from '../mixins/Cookies';
export default {
	name: 'Tasks',
	components: {
        Popup:Popup
	},
	data: function(){
		return{
            showPopup: false,
            popupTask: {
                title: "",
                summary: "",
                dueDate: "",
                completedDate: "",
                status: "open",
                percentComplete: "60",
                startDate: "",
                deleted: false,
            },
            allTasks: [],
            projectHours: 0,
            popupType: null,
            ACTIVITY_CREATE: 0,
            ACTIVITY_EDIT: 1,
            clockedIn: false,
            user: {},
            project: {},
        }
    },
    mounted: function(){
        this.getCookies();
        this.getAllTasks();
    },
    computed: {
        sortedTasks: function(){
            return this.allTasks.slice().sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
        }
    },
    methods: {
        getCookies: function(){
            this.user = Cookies.getUser();
            this.project = Cookies.getProject();
        },
        markComplete: function(task){
            var vue = this;
            var res = Task.complete(task.id);
            res.then(function(response){
                task.status = "closed";
                for (var i = 0; i < vue.allTasks.length; i++){
                    var tempTask = vue.allTasks[i];
                    if (tempTask.id == task.id){
                        vue.$set(vue.allTasks, i, task);
                    }
                }
            }).catch(function(e){

            });
        },  
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
                this.user.id, 
                this.project.id,
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
                status: "open",
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
                this.user.id, 
                this.project.id, 
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
            var res = Task.getTasksForProjectID(this.project.id);
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
    }
}
</script>

