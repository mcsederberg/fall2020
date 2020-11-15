<template>
    <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8" style="min-height: 100%;">
            <i @click="createTaskPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg font-sans">Team Tasks</div>
                </div>
                <TaskDropdown 
                    :taskList="sortedOverdueTasks"
                    taskGroup="Overdue" 
                    @deleted="deleted"
                    @completeTask="completeTask"
                    @editTask="editActivityPopup"/>
                <TaskDropdown 
                    :taskList="sortedInProgressTasks"
                    taskGroup="In Progress" 
                    @deleted="deleted"
                    @completeTask="completeTask"
                    @editTask="editActivityPopup"/>
                <TaskDropdown 
                    :taskList="sortedCompletedTasks"
                    taskGroup="Completed" 
                    @deleted="deleted"
                    @completeTask="completeTask"
                    @editTask="editActivityPopup"/>
                <TaskDropdown 
                    :taskList="sortedFutureTasks"
                    taskGroup="Future" 
                    @deleted="deleted"
                    @completeTask="completeTask"
                    @editTask="editActivityPopup"/>
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
import TaskDropdown from '../components/TaskDropdown';
// import T from '../components/Task'
import taskMixin from '../mixins/taskMixin'
export default {
	name: 'TeamTasks',
	components: {
        Popup:Popup,
        TaskPopup: TaskPopup,
        TaskDropdown: TaskDropdown,
    },
    mixins: [taskMixin],
	data: function(){
		return{
            overdueTasksOpen: false,
            inProgressTasksOpen: false,
            completedTasksOpen: false,
            futureTasksOpen: false 
        }
    },
    mounted: function(){
        this.getCookies();
        this.getAllTasks();
    },
    computed: {
        sortedOverdueTasks: function() {
            return this.overdueTasks.slice().sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
        },
        sortedInProgressTasks: function() {
            return this.inProgressTasks.slice().sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
        },
        sortedCompletedTasks: function() {
            return this.completedTasks.slice().sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
        },
        sortedFutureTasks: function() {
            return this.futureTasks.slice().sort((a,b) => new Date(b.start_date) - new Date(a.start_date));
        }
    },
    methods: {
        getAllTasks: function(){
            var vue = this;
            var res = Task.getSortedTasksForProjectID(this.project.id);
            res.then(function(response){
                vue.overdueTasks = response.overdueTasks;
                vue.inProgressTasks = response.inProgressTasks;
                vue.completedTasks = response.completedTasks;
                vue.futureTasks = response.futureTasks;
                if (response.error.length > 0) {
                    throw "Error when sorting tasks!";
                }
                vue.showPopup = false;
            }).catch(function(e){
                var code = e.error;
                switch (code){
                    default:
                }
            });
        },
        deleted: function(taskID) {
            this.deletePopupOpen = true; 
            this.toDeleteID= taskID;
        }
    }
}
</script>

