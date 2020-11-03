import Cookies from '../mixins/Cookies';
import Task from '../models/Task';

export default{
	data: function() {
		return {
			showPopup: false,
            popupTask: {
                title: "",
                summary: "",
                dueDate: "",
                completedDate: "",
                percentComplete: "",
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
            deletePopupOpen:false,
            toDeleteID:null
		}
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
        SQLDateTime: function(date){
            if (date == ""){
                return null;
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
            || this.popupTask.dueDate == ""
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
                }
            });
        },
        completeTask: function(taskID) {
            var res = Task.completeTask(taskID);
            var vue = this;
			res.then(function(completedDate){
				for (var i in vue.allTasks) {
                    if (vue.allTasks[i].id == taskID) {
                        vue.$set(vue.allTasks[i], 'completedDate', completedDate);
                        vue.$set(vue.allTasks[i], 'percentComplete', 100);
                        break;
                    }
                }
            }).catch(function(e){
                var code = e.error;	
                switch (code){
                    default:
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
                percentComplete: "0",
                startDate: "",
                deleted: false,
            };
            this.showPopup = true;
        },
        createTask: function(){
            if (this.popupTask.title == "" 
            || this.popupTask.dueDate == "" 
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
        popupDate: function(dateString){
            return new Date(dateString).toString("MMM dd yyyy");
        },
	}
}
