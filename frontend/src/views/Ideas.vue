{{ src/components/Gantt.vue }}
<template>
<div class="about w-full h-full bg-lightBlue">
	<div class="w-2/3 mx-auto bg-darkBlue  border-orange border-l-8 border-r-8" style="min-height: 100%">
		<i @click="createNote()" style="right: 15px; top: 15px; font-size: 35px;" class="float-right fa fa-plus relative text-primary-alt cursor-pointer text-teal"/>
		<div class="flex w-1/2 mx-auto">
			<div class="text-xxxlg font-sans">Idea Board</div>
		</div>
		<!-- <Message :message="message"
			@deleted="toDeleteID = message.id; deletePopupOpen = true;"
			@editMessage="editNote"
			@prioritizeMessage="prioritizeMessage"/> -->
		<Message v-for="message in messages" :key="message.id"
			:message="message"
			@deleted="toDeleteID = message.id; deletePopupOpen = true;"
			@editMessage="editNote"
			@prioritizeMessage="prioritizeMessage"/>
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
import M from '../components/Message';
import NotePopup from '../components/NotePopup'
import Message from '../models/Message'
import Popup from '../components/Popup';
export default {
	name: 'IdeaBoard',
	components: {
		NotePopup: NotePopup,
		Message: M,
		Popup: Popup
	},
	data: function(){
		return{
			user: {},
			project: {},
			projectUsers: [],
			//temp message, just for testing
			message: {content: "Here is the content to be shared", userFirstName: "Michael", timePublished: "2020-12-07T07:00:00.000Z", editDate: "2020-12-07T07:00:00.000Z", priority: true},
			showPopup: false,
			NOTE_CREATE: 0,
			NOTE_EDIT: 1,
			popupType: 0,
			popupNote: {},
			deletePopupOpen: false,
			toDeleteID: null, 
			messages: []
		}
	},
	mounted: function(){
		this.user = Cookies.getUser();
		this.project = Cookies.getProject();
		this.projectUsers = Cookies.getUsers();
		this.getMessages();
	},
	computed: {

	},
	methods: {
		getMessages: function() {
			var vue = this;
            var res = Message.getMessages(this.project.id);
            res.then(function(response){
                vue.messages = response;
            }).catch(function(e){
                var code = e.error;
                switch (code){
                    default:
                }
            });
		},
		createNote: function() {
			this.popupType = this.NOTE_CREATE;
			this.popupNote = {}; //ok??
			this.showPopup = true;
		},
		editNote: function(note) {
			this.popupType = this.NOTE_EDIT;
			this.popupNote = note;
			this.showPopup = true;
		},
		updateNote: function(note, deleted = false) {
			let noteID = note.id;
			var res = Message.updateMessage(
                this.note.id, 
				this.note.content,
				Date.now(),
				this.note.priority,
				deleted
            );
            var vue = this;
            res.then(function(response){
				if (!deleted) {
					let user = vue.projectUsers.find(us => {
						return us.id == response.userID
					})
					let userFirstName = user.firstName;
					for (var i in vue.messages) {
						if (vue.messages[i].id == response.id) {
							vue.$set(vue.messages, i, response);
							vue.$set(vue.messages[i], 'userFirstName', userFirstName)
							break;
						}
					}
				}
				else {
					vue.messages = vue.messages.filter(function(message){
						return message.id !== noteID;
					});
				}
                vue.showPopup = false;
            }).catch(function(e){
                var code = e.error;	
                switch (code){
                    default:
                }
            });
		},
		createNewNote: function(note) { 
			var res = Message.createMessage(
				this.project.id, 
				this.user.id,
				note.content, 
				Date.now(),
				Date.now(),
				note.important
            );
            var vue = this;
            res.then(function(response){
				let user = vue.projectUsers.find(us => {
						return us.id == response.userID
					})
				let userFirstName = user && user.firstName ? user.firstName : "error";
				response.userFirstName = userFirstName;
                vue.messages.unshift(response); //todo probably create computed property to sort by date
                vue.showPopup = false;
            }).catch(function(e){
                var code = e.error;	
                switch (code){
                    default:
                }
            });
		},
		prioritizeMessage: function(note) { 
			note.priority = !note.priority;
			this.updateNote(note);
		},
		/**
		 * You already have asked are you sure you want to delete, now call the ajax to delete the note
		 */
		deleteNote: function(id) { 
			let messageToDelete = this.messages.find(message => {
				return message.id = id;
			})
			this.updateNote(messageToDelete, true);
		},
		notePopupFunction: function(note) {
			if (this.popupType == this.NOTE_CREATE) {
				this.createNewNote(note);
			}
			else {
				this.updateNote(note);
			}
			this.showPopup = false;
		},	
	}
}
</script>