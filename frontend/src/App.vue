<template>
<div id="app">
	<div id="header">
		<div class="title">
			Forklift
		</div>
	</div>
	<div id="mainWrapper">
		<div id="sidebar" v-if="$route.name !== 'Login' && $route.name !== 'Projects'">
			<router-link to="/home" class="sidebarOption">Home</router-link>
			<router-link to="/projects" class="sidebarOption">Projects</router-link>
			<router-link to="/tasks" class="sidebarOption">Tasks</router-link>
			<router-link to="/chart" class="sidebarOption">Gantt chart</router-link> 
		</div>
		<router-view/>
	</div>
</div>
</template>


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

#sidebar a.router-link-exact-active {
    background-color: #242424;
}
.title{
    margin: auto 0px;
    font-size: 30px;
}
#header{
    height: 63px;
    border-bottom: 1px solid #a4a4a4;
    padding-left: 40px;
    background: #242424;
    color: white;
    display: flex;
}
</style>
