<template>
    <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8 h-full">
            <i @click="createTaskPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg">My Tasks</div>
                </div>
                <Task v-for="task in sortedTasks" :key="task.id" class=" self-center w-1/2"
                 :title="task.title"
                 :dueDate="task.dueDate"
                 :summary="task.summary"
                 @deleted="deleteTask(task.id)">  
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
// import Cookies from '../mixins/Cookies';
import T from '../components/Task'
import taskMixin from '../mixins/taskMixin'
export default {
	name: 'Tasks',
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
        this.getAllTasks();
    },
    methods: { //see mixin for more
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
    }
}
</script>

