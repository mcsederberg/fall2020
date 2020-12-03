{{ src/components/Gantt.vue }}
<template>
<div class="about w-full h-full bg-lightBlue">
	<div class="w-2/3 mx-auto bg-darkBlue  border-orange border-l-8 border-r-8" style="min-height: 100%">
		<i @click="createNote()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
		<div class="flex w-1/2 mx-auto">
			<div class="text-xxxlg font-sans">Idea Board</div>
		</div>
	</div>
	<NotePopup v-if="showPopup" 
            :popupType="popupType"
            :popupNote="popupNote"
            @notePopupFunction="notePopupFunction"
            @closePopup="showPopup=false"
			@deleteNote="deleteNote"/>
	<Popup v-if="deletePopupOpen" title="Are you sure you want to delete this note?" @closed="deletePopupOpen = false; toDeleteID = null">
		<div class="flex justify-center">
			<div class="mr-2 mt-3 border p-2 cursor-pointer" @click="deleteNote(toDeleteID); deletePopupOpen=false; toDeleteID = null">Yes</div>
			<div class="ml-2 mt-3 border p-2 cursor-pointer" @click="deletePopupOpen = false; toDeleteID = null">No</div>
		</div>
	</Popup>
</div>
</template>

<script>
import Cookies from '../mixins/Cookies'
import NotePopup from '../components/NotePopup'
export default {
	name: 'IdeaBoard',
	components: {
		NotePopup: NotePopup
	},
	data: function(){
		return{
			user: {},
			project: {},
			projectUsers: [],
			showPopup: false,
			NOTE_CREATE: 0,
			NOTE_EDIT: 1,
			popupType: 0,
			popupNote: {},
			deletePopupOpen: false,
			toDeleteID: null
		}
	},
	mounted: function(){
		this.user = Cookies.getUser();
		this.project = Cookies.getProject();
		this.projectUsers = Cookies.getUsers();
	},
	computed: {

	},
	methods: {
		createNote: function() {
			this.popupType = this.NOTE_CREATE;
			this.popupNote = {}; //ok??
			this.showPopup = true;
		},
		editNote: function(id) {
			this.popupType = this.NOTE_EDIT;
			console.log(id) // this.popupNote = //TODO
			this.showPopup = true;
		},
		updateNote: function(note) { //TODO
			console.log(note)
		},
		createNewNote: function(note) { //TODO
			console.log(note)
		},
		/**
		 * You already have asked are you sure you want to delete, now call the ajax to delete the note
		 */
		deleteNote: function(id) { //TODO
			console.log(id)
		},
		notePopupFunction: function(note) {
			if (this.popupType == this.NOTE_CREATE) {
				this.createNewNote(note);
			}
			else {
				this.updateNote(note);
			}
			this.showPopup = false;
		}
	}
}
</script>