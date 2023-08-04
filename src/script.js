import './style.css';
import {todo,taskList} from './task.js';
import {project,projectList} from './project.js';
import loadPage from './dom';

function loadStorage(){
    if(localStorage.getItem("tasklist") && localStorage.getItem("projectlist")){
        taskList=JSON.parse(localStorage.getItem("tasklist"))
        projectList=JSON.parse(localStorage.getItem("projectlist"))
    }else{
        new project('Home');
        new project('Work');
        new todo("Yoga","Yoga ","26-07-2023","High","Do 15 minutes of yoga",false).assignedTo=projectList[0];
        new todo("Laundry","Do laundry","27-07-2023","Normal","",false).assignedTo=projectList[0];
        new todo("Meeting","Meeting at 2pm","25-07-2023","High","Meeting with Charles on Teams about new project",true).assignedTo=projectList[1];
    }
}
loadStorage()
loadPage();




