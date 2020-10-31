<template>
    <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8" style="min-height: 100%;">
            <i @click="createTaskPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg font-sans">My Tasks</div>
                </div>
                <Task v-for="task in sortedTasks" :key="task.id" class=" self-center w-1/2"
                 :taskID="task.id"
                 :userFirstName="task.userFirstName"
                 :title="task.title"
                 :dueDate="task.dueDate"
                 :summary="task.summary"
                 :editPercent="true"
                 :percent="task.percentComplete"
                 @deleted="deletePopupOpen = true; toDeleteID=task.id"
                 @editTask="editActivityPopup(task)"
                 @savePercent="savePercent(task, ...arguments)">  
                </Task>
            </div>
        </div>

        <Popup v-if="showPopup" id="newTaskPopup" :title="popupType == ACTIVITY_CREATE? 'Add Task' : 'Update Task'" @closed="showPopup=false">
            <div class="flex flex-col">
                <div class="border px-3 pt-3">
                    <div class="flex flex-row">
                        <div class="my-1"><label for="newStartDate">Start Date: </label><input id="newStartDate" v-model="popupTask.startDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/></div>
                        <div class="my-1 ml-2"><label for="newDueDate">Due Date: </label><input id="newDueDate" v-model="popupTask.dueDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/></div>
                    </div>
                    <div class="my-1"><label for="newCompletedDate">Completed Date (Optional): </label><input id="newCompletedDate" v-model="popupTask.completedDate" class="ml-2 px-1 bg-darkBlue border w-32"/></div>
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
        <Popup v-if="deletePopupOpen" title="Are you sure you want to delete this task?" @closed="deletePopupOpen = false; toDeleteID = null">
            <div class="flex justify-center">
                <div class="mr-2 mt-3 border p-2 cursor-pointer" @click="deleteTask(toDeleteID); deletePopupOpen=false; toDeleteID = null">Yes</div>
                <div class="ml-2 mt-3 border p-2 cursor-pointer" @click="deletePopupOpen = false; toDeleteID = null">No</div>
            </div>
        </Popup>
    </div>
</template>

<script>
import Task from '../models/Task';
import Popup from '../components/Popup';
import T from '../components/Task'
import taskMixin from '../mixins/taskMixin'
export default {
	name: 'MyTasks',
	components: {
        Popup:Popup,
        Task:T
    },
    mixins: [taskMixin],
	data: function(){
		return{
        }
    },
    mounted: function(){
        this.getCookies();
        this.getMyTasks();
    },
    methods: { //see mixin!
        getMyTasks: function() {
            //todo (should set variable allTasks)
            //for now just get all
            var vue = this;
            var res = Task.getTasksForProjectID(this.project.id, this.user.id);
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
        //updates database with percentage set by slider
        savePercent: function(taskInput, percentComplete) {
            var task = taskInput.duplicate();
            task.completedDate = this.popupDate(task.completedDate);
            task.dueDate = this.popupDate(task.dueDate);
            task.startDate = this.popupDate(task.startDate);
            task.percentComplete = percentComplete;
            this.popupTask = task;
            this.updateTask();
        }
    }
}
</script>

