<template>
    <div v-if="!$route.Login" id="app" class="bg-lightBlue">
        <div id="header" class="bg-header flex flex-col w-full z-10" v-if="$route.name !== 'Login'">
            <div id="headerTabs" class="flex flex-row border-orange border-b">
                <template v-if="$route.name !=='Projects'">
                    <router-link to="/mytasks" class="sidebarOption">My Tasks</router-link>
                    <router-link to="/teamtasks" class="sidebarOption">Team Tasks</router-link>
                    <router-link to="/chart" class="sidebarOption">Team Progress</router-link> 
                    <router-link to="/messages" class="sidebarOption">Idea Board</router-link> 
                </template>
                <div @mouseover="openProfileDropdown = true" @mouseleave="openProfileDropdown = false" class="sidebarOption ml-auto">
                    <div class="">My Profile</div>
                    <div v-if="openProfileDropdown" class="mt-3 border-b border-l border-r border-orange bg-header absolute">
                        <div @click="logout" class="m-2">Logout</div>
                    </div> 
                </div>
            </div>
            <div class="flex text-xxxlg m-5 w-2/3 self-center">
                <template v-if="$route.name !=='Projects'">
                    <router-link to="/projects" class="sidebarOption"><i class="fa fa-arrow-left text-xxlg"/></router-link>
                    <span class="self-center font-sans">
                        Project: {{project.title}} <span v-if="$route.name == 'ProjectSettings'">Settings</span> <router-link to="/projectSettings" class="sidebarOption" v-if="$route.name !== 'ProjectSettings'"><i class="far fa-edit cursor-pointer text-teal text-xlg"/></router-link>
                    </span>
                    <div v-if="$route.name === 'MyTasks' || $route.name === 'TeamTasks'" class="taskHours flex justify-between ml-auto text-sm">
                        <p class="self-center mr-4">Hours: {{projectHours}}</p>
                        <div class="flex self-center">
                            <p class="cursor-pointer py-1 rounded-l-lg text-darkBlue flex justify-center w-16" :class="[{'bg-orange':clockedIn, 'bg-gray':!clockedIn}]"  @click="clockIn()">in</p>
                            <p class="cursor-pointer py-1 rounded-r-lg text-darkBlue flex justify-center w-16" :class="[{'bg-orange':!clockedIn, 'bg-gray':clockedIn}]" @click="clockOut()">out</p>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <span class="ml-4">My Projects</span>
                </template>
            </div>
        </div>
        <div id="mainWrapper">
            <router-view @updateProject="updateProject"/>
        </div>
    </div>
</template>

<script>
import  Cookies from './mixins/Cookies'
import Hour from './models/Hour';
export default {
	name: 'App',
	components: {
	},
	data: function(){
		return{
            projectHours: 0,
            clockedIn: false,
            openProfileDropdown: false,
            project: {},
            user: {}
		}
	},
	beforeUpdate: function(){
        if (this.$route.name == 'Login') {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.removeProperty("overflow");
        }
    },
	created: function(){
        if (this.$route.name == 'Login') {
            document.body.style.overflow = 'hidden';
        }

        this.project = Cookies.getProject();
        this.user = Cookies.getUser();
        var vue = this;
        var res = Hour.getClockedIn(this.user.id, this.project.id);
        res.then(function(result) {
            vue.clockedIn = result;
        }).catch(function(e) {
            console.log(e);
        })

        this.calculateProjectHours();
    },
	methods: {
		logout: function() {
            Cookies.deleteCookie("user");
            Cookies.deleteCookie("project");
            this.$router.push('/');
        },
        clockIn: function() {
            var vue = this;
            var res = Hour.clockIn(this.user.id, this.project.id, "project");
            res.then(function(){
                vue.clockedIn = true;
            }).catch(function(e){
                console.log(e);
                var code = e.error;
                switch (code){
                    default:
                }
            });
        },
        clockOut: function() {
            var vue = this;
            var res = Hour.clockOut(this.user.id, this.project.id);
            res.then(function(){
                vue.clockedIn = false;
            }).catch(function(e){
                var code = e.error;
                switch (code){
                    default:
                }
            });
        },
        calculateProjectHours() {
            var vue = this;
            var res = Hour.getHours(this.user.id, this.project.id);
            res.then(function(result) {
                vue.projectHours = result;
            }).catch(function(e) {
                console.log(e);
            })
        },
        updateProject: function() {
            this.project = Cookies.getProject();
        }
	}
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");
.font-poppins {
    font-family: 'Poppins', serif;
}

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

#headerTabs a.router-link-exact-active {
    color: #ef8354;
    border-bottom: 2px solid #ef8354;
}
.title{
    margin: auto 0px;
    font-size: 30px;
}
#header{
    border-bottom: 1px solid #a4a4a4;
    color: white;
}
</style>
