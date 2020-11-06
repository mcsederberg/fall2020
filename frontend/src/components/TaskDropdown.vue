<template>
    <div class="flex flex-col w-1/2 mx-auto">
        <div @click="tasksOpen = !tasksOpen" class="flex items-center cursor-pointer">
            <div class="text-xlg mr-3">{{taskGroup}}</div>
            <i v-if="tasksOpen" class="fas fa-caret-down"></i>
            <i v-else class="fas fa-caret-up"></i>
        </div>
        <div v-if="tasksOpen">
            <Task v-for="task in taskList" :key="task.id" class=" self-center w-full"
                :task="task"
                @deleted="deleted(task.id)"
                @completeTask="completeTask(task.id)"
                @editTask="editActivityPopup(task)">  
            </Task>
            <div v-if="taskList.length == 0">No {{taskGroup}} Tasks!</div>
        </div>
    </div>
</template>

<script>
import T from '../components/Task'
export default {
	name: 'TaskDropdown',
	components: {
        Task:T
    },
    props: {
        taskList: {
            type: Array,
            required: true
        },
        taskGroup: {
            type: String,
            required: true
        }
    },
	data: function(){
		return{
            tasksOpen: false
        }
    },
    methods: {
        deleted: function(taskID) {
            this.$emit('deleted', taskID);
        },
        completeTask: function(taskID) {
            this.$emit('completeTask', taskID);
        },
        editTask: function(task) {
            this.$emit('editActivityPopup', task);
        }
    }
}
</script>

