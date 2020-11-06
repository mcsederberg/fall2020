
import User from '../models/User';
import Project from '../models/Project';

export default class Cookies {
    static setCookie(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    static getCookie(cname){
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    static deleteCookie(cname){
        Cookies.setCookie(cname, "", -1);
    }
    static setUser(user){
        Cookies.setCookie("user", JSON.stringify(user), "1");
    }
    static getUser(){
        var string = Cookies.getCookie("user");
        if (string == ""){
            return "";
        }
        var user = JSON.parse(string);
        return new User(user.id, user.username, user.password, user.firstName, user.lastName);
    }
    static setProject(project){
        Cookies.setCookie("project", JSON.stringify(project), "1");
    }
    static getProject(){
        var string = Cookies.getCookie("project");
        if (string == ""){
            return "";
        }
        var project = JSON.parse(string);
        return new Project(project.id, project.title, project.summary, project.ownerID, project.deleted);
    }
    static setUsers(users){
        Cookies.setCookie("users", JSON.stringify(users), "1");
    }
    static getUsers(){
        var string = Cookies.getCookie("users");
        if (string == ""){
            return "";
        }
        var users = JSON.parse(string);
        var userObjs = [];
        for (var i = 0; i < users.length; i++){
            var user = users[i];
            userObjs.push(new User(user.id, user.username, user.password, user.firstName, user.lastName));
        }
        return userObjs;
    }
}