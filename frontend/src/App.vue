<template>
    <div v-if="!$route.Login" id="app">
        <div id="header" class="bg-header flex flex-col w-full z-10" v-if="$route.name !== 'Login' && $route.name !== 'Projects'">
            <div id="headerTabs" class="flex flex-row border-orange border-b">
                <router-link to="/tasks" class="sidebarOption">My Tasks</router-link>
                <router-link to="/chart" class="sidebarOption">Team Progress</router-link> 
                <router-link to="/messages" class="sidebarOption">Idea Board</router-link> 
                <div @mouseover="openProfileDropdown = true" @mouseleave="openProfileDropdown = false" class="sidebarOption ml-auto">
                    <div class="">My Profile</div>
                    <div v-if="openProfileDropdown" class="mt-3 w-full border-b border-l border-r border-orange bg-header absolute">
                        <div @click="logout" class="m-2">Logout</div>
                    </div> 
                </div>
            </div>
            <div class="flex text-xxxlg m-5">
                <router-link to="/projects" class="sidebarOption"><i class="fa fa-arrow-left text-xxlg"/></router-link>
                <span class="self-center">
                    Project: {{projectName}} <router-link to="/projects" class="sidebarOption"><i class="far fa-edit cursor-pointer text-teal text-xlg" @click="editActivityPopup(task)"/></router-link>
                </span>
                <div v-if="$route.name === 'Tasks'" class="taskHours flex justify-between ml-auto text-sm">
                    <p class="self-center mr-4">Hours: {{projectHours}}</p>
                    <div class="flex self-center">
                        <p class="cursor-pointer py-1 rounded-l-lg text-darkBlue flex justify-center w-16" :class="[{'bg-orange':clockedIn, 'bg-gray':!clockedIn}]"  @click="clockIn()">in</p>
                        <p class="cursor-pointer py-1 rounded-r-lg text-darkBlue flex justify-center w-16" :class="[{'bg-orange':!clockedIn, 'bg-gray':clockedIn}]" @click="clockOut()">out</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="mainWrapper">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
	name: 'App',
	components: {
	},
	data: function(){
		return{
            projectName: "Forklift",
            projectHours: 0,
            clockedIn: false,
            openProfileDropdown: false
		}
	},
	mounted: function(){

	},
	methods: {
		logout: function() {
            this.$root.$data.user = {};
            this.$root.$data.project = {};
            this.$router.push('/');
        },
        clockIn: function() {
            this.clockedIn = true;
        },
        clockOut: function() {
            this.clockedIn = false;
        }
	}
}
</script>

<style>
#mainWrapper{
    display: flex;
    background: #242424;
}
#sidebar{
    width: 235px;
    color: white;
    background: #353535;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
}
.sidebarOption{
    padding: 10px 20px;
    cursor: pointer;
    color: white;
	font-size: 18px;
	text-decoration: none;
}
.sidebarOption:hover{
    background-color: #242424;
}

#headerTabs a.router-link-exact-active {
    color: #ef8354;
    border-bottom: 2px solid #ef8354;
}
.title{
    margin: auto 0px;
    font-size: 30px;
}
#header{
    /* height: 63px; */
    border-bottom: 1px solid #a4a4a4;
    /* padding-left: 40px; */
    /* background: #242424; */
    color: white;
    display: flex;
}
</style>
