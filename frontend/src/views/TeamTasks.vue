<template>
    <div class="w-full h-full bg-lightBlue" style="background-attachment: fixed;">
        <div class="w-2/3 mx-auto bg-darkBlue border-orange border-l-8 border-r-8" style="min-height: 100%;">
            <i @click="createTaskPopup()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
            <div class="w-full flex flex-col">
                <div class="flex w-1/2 mx-auto mt-4">
                    <div class="text-xxxlg font-sans">Team Tasks</div>
                </div>
                <div @click="overdueTasksOpen = !overdueTasksOpen" class="flex flex-col w-1/2 mx-auto">
                    <div class="flex items-center cursor-pointer">
                        <div class="text-xlg mr-3">Overdue</div>
                        <i v-if="overdueTasksOpen" class="fas fa-caret-down"></i>
                        <i v-else class="fas fa-caret-up"></i>
                    </div>
                    <div v-if="overdueTasksOpen">
                        <Task v-for="task in sortedOverdueTasks" :key="task.id" class=" self-center w-full"
                            :taskID="task.id"
                            :userFirstName="task.userFirstName"
                            :title="task.title"
                            :dueDate="task.dueDate"
                            :summary="task.summary"
                            :percent="task.percentComplete"
                            @deleted="deletePopupOpen = true; toDeleteID=task.id"
                            @editTask="editActivityPopup(task)">  
                        </Task>
                        <div v-if="sortedOverdueTasks.length == 0">No Overdue Tasks!</div>
                    </div>
                </div>
                <div @click="inProgressTasksOpen = !inProgressTasksOpen" class="flex flex-col w-1/2 mx-auto">
                    <div class="flex items-center cursor-pointer">
                        <div class="text-xlg mr-3">In Progress</div>
                        <i v-if="inProgressTasksOpen" class="fas fa-caret-down"></i>
                        <i v-else class="fas fa-caret-up"></i>
                    </div>
                    <div v-if="inProgressTasksOpen">
                        <Task v-for="task in sortedInProgressTasks" :key="task.id" class=" self-center w-full"
                            :taskID="task.id"
                            :userFirstName="task.userFirstName"
                            :title="task.title"
                            :dueDate="task.dueDate"
                            :summary="task.summary"
                            :percent="task.percentComplete"
                            @deleted="deletePopupOpen = true; toDeleteID=task.id"
                            @editTask="editActivityPopup(task)">  
                        </Task>
                        <div v-if="sortedInProgressTasks.length == 0">No In Progress Tasks!</div>
                    </div>
                </div>
                <div @click="completedTasksOpen = !completedTasksOpen" class="flex flex-col w-1/2 mx-auto">
                    <div class="flex items-center cursor-pointer">
                        <div class="text-xlg mr-3">Completed</div>
                        <i v-if="completedTasksOpen" class="fas fa-caret-down"></i>
                        <i v-else class="fas fa-caret-up"></i>
                    </div>
                    <div v-if="completedTasksOpen">
                        <Task v-for="task in sortedCompletedTasks" :key="task.id" class=" self-center w-full"
                            :taskID="task.id"
                            :userFirstName="task.userFirstName"
                            :title="task.title"
                            :dueDate="task.dueDate"
                            :summary="task.summary"
                            :percent="task.percentComplete"
                            @deleted="deletePopupOpen = true; toDeleteID=task.id"
                            @editTask="editActivityPopup(task)">  
                        </Task>
                        <div v-if="sortedCompletedTasks.length == 0">No Completed Tasks!</div>
                    </div>
                </div>
                <div @click="futureTasksOpen = !futureTasksOpen" class="flex flex-col w-1/2 mb-4 mx-auto">
                    <div class="flex items-center cursor-pointer">
                        <div class="text-xlg mr-3">Future</div>
                        <i v-if="futureTasksOpen" class="fas fa-caret-down"></i>
                        <i v-else class="fas fa-caret-up"></i>
                    </div>
                    <div v-if="futureTasksOpen"> 
                        <Task v-for="task in sortedFutureTasks" :key="task.id" class=" self-center w-full"
                            :taskID="task.id"
                            :userFirstName="task.userFirstName"
                            :title="task.title"
                            :dueDate="task.dueDate"
                            :summary="task.summary"
                            :percent="task.percentComplete"
                            @deleted="deletePopupOpen = true; toDeleteID=task.id"
                            @editTask="editActivityPopup(task)">  
                        </Task>
                        <div v-if="sortedFutureTasks.length == 0">No Future Tasks!</div>
                    </div>
                </div>
            </div>
        </div>

        <Popup v-if="showPopup" id="newTaskPopup" :title="popupType == ACTIVITY_CREATE? 'Add Task' : 'Update Task'" @closed="showPopup=false">
            <div class="flex flex-col text-lg">
                <div class="border px-3 pt-3">
                    <div class="flex flex-row">
                        <div class="my-1"><label for="newStartDate">Start Date: </label><input type="date" id="newStartDate" v-model="popupTask.startDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/></div>
                        <div class="my-1 ml-2"><label for="newDueDate">Due Date: </label><input type="date" id="newDueDate" v-model="popupTask.dueDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/></div>
                    </div>
                    <div class="my-1"><label for="newCompletedDate">Completed Date (If already complete): </label><input type="date" id="newCompletedDate" v-model="popupTask.completedDate" class="ml-2 px-1 bg-darkBlue border w-32"/></div>
                    <div class="my-1"><label for="newTitle">Title: </label><input id="newTitle" v-model="popupTask.title" class="ml-2 px-1 bg-darkBlue border"/></div>
                    <div class="my-1"><label for="newSummary">Description (Optional): </label><br><textarea id="newSummary" v-model="popupTask.summary" class="w-full px-1 bg-darkBlue border"/></div>
                </div>
                <div class="ml-auto mt-3 px-2 py-1 cursor-pointer bg-green text-darkBlue rounded-lg" @click="taskPopupFunction">{{popupType == ACTIVITY_CREATE? 'Create' : 'Update'}}</div>
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
// import Cookies from '../mixins/Cookies';
import T from '../components/Task'
import taskMixin from '../mixins/taskMixin'
export default {
	name: 'TeamTasks',
	components: {
        Popup:Popup,
        Task:T
    },
    mixins: [taskMixin],
	data: function(){
		return{
            overdueTasks: [],
            inProgressTasks: [],
            completedTasks: [],
            futureTasks: [],
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
                vue.delayedTasks = response.delayedTasks;
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
    }
}
</script>

