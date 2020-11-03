<template>
    <Popup id="newTaskPopup" :title="popupType == ACTIVITY_CREATE? 'Add Task' : 'Update Task'" @closed="closePopup">
        <div class="flex flex-col text-lg">
            <div class="border px-3 pt-3">
                <div class="flex flex-row">
                    <div class="py-2">
                        <label for="newStartDate">Start Date: </label>
                        <input id="newStartDate" type="date" v-model="task.startDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/>
                    </div>
                    <div class="py-2 ml-2">
                        <label for="newDueDate">Due Date: </label>
                        <input id="newDueDate" type="date" v-model="task.dueDate" class="ml-2 px-1 float-right bg-darkBlue border w-32"/>
                    </div>
                </div>
                <div class="py-2">
                    <label for="newCompletedDate">Completed Date (If already complete): </label>
                    <input id="newCompletedDate" type="date" v-model="task.completedDate" class="ml-2 px-1 bg-darkBlue border w-32"/>
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
            </div>
            <div class="ml-auto mt-3 border bg-green text-darkBlue p-2 cursor-pointer" @click="taskPopupFunction">{{popupType == ACTIVITY_CREATE? 'Create' : 'Update'}}</div>
        </div>
    </Popup>
</template>

<script>
import Popup from '../components/Popup';
export default {
	name: 'MyTasks',
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
        }
    },
    data: function() {
        return {
            task: this.popupTask,
            ACTIVITY_CREATE: 0,
            ACTIVITY_EDIT: 1,
        }
    },
    methods: {
        taskPopupFunction: function() {
            this.$emit('taskPopupFunction', this.task);
        },
        closePopup: function() {
            this.$emit('closePopup');
        }
    }
}
</script>

