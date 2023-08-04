import './style.css';
import {todo,displayAllTasks,taskList,id} from './task.js';
import {project,displayAllProjects,projectList} from './project.js';
import loadPage from './dom';
function loadStorage(){
    if(localStorage.getItem("tasklist") && localStorage.getItem("projectlist")){
        taskList=JSON.parse(localStorage.getItem("tasklist"))
        projectList=JSON.parse(localStorage.getItem("projectlist"))
    }else{
        const exampleProject1 = new project('firstproject');
        const exampleProject2 = new project('secondproject');
        const exampleTask1= new todo("First","Description","26-07-2023","High","fgssfdafsdafdsafsdaasdffdasasdfsdfafsdasdfasdafafsd",false);
        const exampleTask2= new todo("Second","","","","",true);
        exampleTask1.assignedTo=projectList[0]
        exampleTask2.assignedTo=projectList[1]
    }
}

loadStorage()
//displayAllTasks();
//displayAllProjects()
loadPage();




