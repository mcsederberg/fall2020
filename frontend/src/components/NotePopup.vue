<template>
<div>
    <Popup id="notePopup" :title="popupType == NOTE_CREATE ? 'New Note' : 'Edit Note'" @closed="closePopup">
        <div class="flex flex-col text-lg">
            <div class="border px-3 pt-3">
                <div class="pb-4">
                    <input name="important" id="important" type="checkbox" class="bg-darkBlue border mr-6 " v-model="note.important"/>
                    <label for="important">Mark as important</label>
                </div>
				<div class="py-2">
                    <label for="text">Text: </label>
                    <br>
                    <textarea id="text" v-model="note.text" style="min-width:350px" class="h-32 px-1 bg-darkBlue border"/>
                </div>
            </div>
			<div class="flex justify-end"> <!-- WHY WONT THIS GO OVER TO THE RIGHT-->
				<div v-if="popupType == NOTE_CREATE" class=" mt-3 border p-2 cursor-pointer" @click="closePopup">Cancel</div>
				<div v-else class="mt-3 border p-2 cursor-pointer" @click="deletePopup">Delete</div>
				<div class="ml-2 mt-3 border bg-green text-darkBlue p-2 cursor-pointer" @click="notePopupFunction">{{popupType == NOTE_CREATE? 'Create' : 'Update'}}</div>
			</div>
        </div>
    </Popup>
	<Popup v-if="deleting" title="Are you sure you want to delete this note?" @closed="deleting = false;">
		<div class="flex justify-center">
			<div class="mr-2 mt-3 border p-2 cursor-pointer" @click="deleteNote(); deleting=false;">Yes</div>
			<div class="ml-2 mt-3 border p-2 cursor-pointer" @click="deleting = false;">No</div>
		</div>
    </Popup>
</div>
</template>

<script>
// import Cookies from '../mixins/Cookies';
import Popup from '../components/Popup';
export default {
	name: 'NotePopup',
	components: {
        Popup:Popup,
    },
    props: {
        popupType: {
            type: Number,
            required: true
        },
        popupNote: {
            type: Object,
        }
    },
    data: function() {
        return {
            note: this.popupNote,
            NOTE_CREATE: 0,
			NOTE_EDIT: 1,
			deleting: false
        }
    },
    methods: {
        notePopupFunction: function() {
            this.$emit('notePopupFunction', this.note);
        },
        closePopup: function() {
            this.$emit('closePopup');
		},
		deletePopup: function() {
			this.deleting = true;
		},
		deleteNote: function() {
			this.$emit('deleteNote');
		}
    },
    // created: function() {
    //     this.users = Cookies.getUsers();
    // }
}
</script>

