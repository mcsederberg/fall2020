<template>
    <Popup id="newTaskPopup" :title="popupType == ACTIVITY_CREATE? 'Add Task' : 'Update Task'" @closed="closePopup">
        <div class="flex flex-col text-lg">
            <div class="border px-3 pt-3">
                <div class="flex flex-row">
                    <div class="py-2">
                        <label for="newStartDate">Start Date: </label>
                        <input id="newStartDate" type="date" v-model="task.startDate" class="ml-2 px-1 float-right bg-darkBlue border" style="width: 11rem"/>
                    </div>
                    <div class="py-2 ml-2">
                        <label for="newDueDate">Due Date: </label>
                        <input id="newDueDate" type="date" v-model="task.dueDate" class="ml-2 px-1 float-right bg-darkBlue border" style="width: 11rem"/>
                    </div>
                </div>
                <div class="py-2">
                    <label for="newCompletedDate">Completed Date (If already complete): </label>
                    <input id="newCompletedDate" type="date" v-model="task.completedDate" class="ml-2 px-1 bg-darkBlue border" style="width: 11rem"/>
                </div>
                <div class="py-2">
                    <label for="newTitle">Title: </label>
                    <input id="newTitle" v-model="task.title" class="ml-2 px-1 bg-darkBlue border"/>
                </div>
                <div class="py-2">
                    <label for="newSummary">Description (Optional): </label>
                    <br>
                    <textarea id="newSummary" v-model="task.summary" class="w-full px-1 bg-darkBlue border"/>
                </div>
                <div class="pb-4">
                    <label for="assignee">Assignee: </label>
                    <select name="assignee" id="assignee" class="bg-darkBlue border w-48" v-model="task.user">
                        <option v-for="user in users" :key="user.id" :value="user">{{user.firstName}} {{user.lastName}}</option>
                    </select>
                </div>
                <div class="pb-4">
                    <label for="assignee">Parent task (Optional): </label>
                    <select name="parentTask" id="parentTask" class="bg-darkBlue border w-48" v-model="task.parentID">
                        <option v-for="task in tasks" :key="task.id" :value="task.id">{{task.title}}</option>
                    </select>
                </div>
            </div>
            <div class="ml-auto mt-3 border bg-green text-darkBlue p-2 cursor-pointer" @click="taskPopupFunction">{{popupType == ACTIVITY_CREATE? 'Create' : 'Update'}}</div>
        </div>
    </Popup>
</template>

<script>
import Cookies from '../mixins/Cookies';
import Popup from '../components/Popup';
export default {
	name: 'TaskPopup',
	components: {
        Popup:Popup,
    },
    props: {
        popupType: {
            type: Number,
            required: true
        },
        popupTask: {
            type: Object,
        },
        tasks: {
            type: Array,
        }
    },
    data: function() {
        return {
            task: this.popupTask,
            ACTIVITY_CREATE: 0,
            ACTIVITY_EDIT: 1,
            users: []
        }
    },
    methods: {
        taskPopupFunction: function() {
            this.$emit('taskPopupFunction', this.task);
        },
        closePopup: function() {
            this.$emit('closePopup');
        }
    },
    created: function() {
        this.users = Cookies.getUsers();
    }
}
</script>

