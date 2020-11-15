<template>
    <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8" style="min-height: 100%;">
            <i @click="createTaskPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg font-sans">My Tasks</div>
                </div>
                <Task v-for="task in sortedTasks" :key="task.id" class=" self-center w-1/2"
                 :task="task"
                 :percent="task.percentComplete"
                 :editPercent="true"
                 @deleted="deletePopupOpen = true; toDeleteID=task.id"
                 @completeTask="completeTask"
                 @editTask="editActivityPopup(task)"
                 @savePercent="savePercent(task, ...arguments)">  
                </Task>
            </div>
        </div>

        <TaskPopup v-if="showPopup" 
            :popupType="popupType"
            :popupTask="popupTask"
            @taskPopupFunction="taskPopupFunction"
            @closePopup="showPopup=false"/>
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
import TaskPopup from '../components/TaskPopup';
import T from '../components/Task'
import taskMixin from '../mixins/taskMixin'
export default {
	name: 'MyTasks',
	components: {
        Popup:Popup,
        Task:T,
        TaskPopup: TaskPopup
    },
    mixins: [taskMixin],
    mounted: function(){
        this.getCookies();
        this.getMyTasks();
    },
    methods: {
        getMyTasks: function(){
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
            var task = taskInput;
            if (!task.completeDate && percentComplete == 100) {
                task.completedDate = new Date();
            }
            task.completedDate = this.popupDate(task.completedDate);
            if (task.completedDate && percentComplete != 100) {
                task.completedDate = "";
            }
            task.dueDate = this.popupDate(task.dueDate);
            task.startDate = this.popupDate(task.startDate);
            task.percentComplete = percentComplete;
            this.popupTask = task;
            this.updateTask();
        }
    }
}
</script>

