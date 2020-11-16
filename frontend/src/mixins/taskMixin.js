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
                user: {}
            },
            allTasks: [],
            overdueTasks: [],
            inProgressTasks: [],
            completedTasks: [],
            futureTasks: [],
            projectHours: 0,
            popupType: null,
            ACTIVITY_CREATE: 0,
            ACTIVITY_EDIT: 1,
            clockedIn: false,
            user: {},
            project: {},
            deletePopupOpen:false,
            toDeleteID:null,
            projectUsers: []
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
            this.projectUsers = Cookies.getUsers();
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
            var task = {...taskInput};
            task.completedDate = taskInput.completedDate ? this.popupDate(taskInput.completedDate) : null;
            task.dueDate = this.popupDate(taskInput.dueDate);
            task.startDate = this.popupDate(taskInput.startDate);
            task.user = this.projectUsers.find(us => {
                return us.id == task.userID
            })
            task.percentComplete = task.completeDate ? 100 : task.percentComplete; //this isn't working
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
            let userID = this.popupTask.id ? this.popupTask.id : this.user.id; //they can edit the user, but if you are only updating percentage, need a default
            var res = Task.updateTask(
                this.popupTask.id, 
                this.project.id,
                userID,
                this.popupTask.title, 
                this.popupTask.summary,
                this.SQLDateTime(this.popupTask.dueDate), 
                this.SQLDateTime(this.popupTask.startDate), 
                this.popupTask.completeDate ? this.SQLDateTime(this.popupTask.completedDate) : null,
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
                for (let i in vue.futureTasks) {
                    if (vue.futureTasks[i].id == response.id) {
                        vue.$set(vue.futureTasks, i, response);
                        break;
                    }
                }
                for (let i in vue.inProgressTasks) {
                    if (vue.inProgressTasks[i].id == response.id) {
                        vue.$set(vue.inProgressTasks, i, response);
                        break;
                    }
                }
                for (let i in vue.overdueTasks) {
                    if (vue.overdueTasks[i].id == response.id) {
                        vue.$set(vue.overdueTasks, i, response);
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
				for (let i in vue.allTasks) {
                    if (vue.allTasks[i].id == taskID) {
                        vue.$set(vue.allTasks[i], 'completedDate', completedDate);
                        vue.$set(vue.allTasks[i], 'percentComplete', 100);
                        break;
                    }
                }
                for (let i in vue.futureTasks) {
                    if (vue.futureTasks[i].id == taskID) {
                        vue.$set(vue.futureTasks[i], 'completedDate', completedDate);
                        vue.$set(vue.futureTasks[i], 'percentComplete', 100);
                        break;
                    }
                }
                for (let i in vue.inProgressTasks) {
                    if (vue.inProgressTasks[i].id == taskID) {
                        vue.$set(vue.inProgressTasks[i], 'completedDate', completedDate);
                        vue.$set(vue.inProgressTasks[i], 'percentComplete', 100);
                        break;
                    }
                }
                for (let i in vue.overdueTasks) {
                    if (vue.overdueTasks[i].id == taskID) {
                        vue.$set(vue.overdueTasks[i], 'completedDate', completedDate);
                        vue.$set(vue.overdueTasks[i], 'percentComplete', 100);
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
                user: this.user
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
            if (this.popupTask.completedDate != "") {
                this.popupTask.percentComplete = 100;
            }
            var res = Task.createTask(
                this.popupTask.user.id, 
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
                var today = new Date();
                for (let i = 0; i < vue.projectUsers.length; i++) {
                    if (vue.projectUsers[i].id == response.userID) {
                        response.userFirstName = vue.projectUsers[i].userFirstName;
                        break;
                    }
                }
                if (new Date(response.dueDate) < today && !response.completedDate) {
                    vue.overdueTasks.push(response);
                }
                else if (new Date(response.startDate) <= today && new Date(response.dueDate) > today && !response.completedDate) {
                    vue.inProgressTasks.push(response);
                }
                else if (response.completedDate) {
                    vue.completedTasks.push(response);
                }
                else if (new Date(response.startDate) > today && !response.completedDate) {
                    vue.futureTasks.push(response);
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
            return new Date(dateString).toString("yyyy-MM-dd");
        },
	}
}
