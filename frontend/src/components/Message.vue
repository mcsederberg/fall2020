<template>
    <div :class="[{'border-orange border-4' : message.priority}, 'bg-header p-2']">
        <div class="flex justify-between cursor-pointer text-md">
            <div class="flex">
                <i class="far fa-edit text-teal mr-2" @click="editMessage()"/>
                <i class="fas fa-exclamation-circle" @click="prioritizeMessage()" :title="message.priority ? 'Unmark' : 'Mark as important'"/>
            </div>
            <i class="fa fa-times cursor-pointer ml-auto" @click="deleted()"/>
        </div>
        <div class="m-2 text-lg">{{message.content}}</div>
        <div class="flex justify-between">
            <em>-{{message.userFirstName}}</em>
            <div>Last edited: {{prettyDate(message.editDate)}}</div><!--edit date or published date?-->
        </div>
    </div>
</template>

<script>
export default {
	name: 'Message',
	props: {
		message: {
			type: Object,
			required: true
		},
	},
	methods: {
		deleted: function() {
			this.$emit("deleted")
		},
		editMessage: function() {
			this.$emit("editMessage", this.message);
		},
        prioritizeMessage: function() {
            this.$emit("prioritizeMessage", this.message);
        },
		prettyDate: function(dateString){
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var date = new Date(dateString);
			var monthIndex = date.getMonth();
			var day = date.getDate();
			var year = date.getFullYear();
			return months[monthIndex] + " " + day + ", " + year;
		},
	},
}
</script>