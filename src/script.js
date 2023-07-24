import './style.css';
import {todo,displayAllTasks,tasklist,id} from './task.js';
import {project,displayAllProjects,projectList} from './project.js';
import loadPage from './dom';
function loadStorage(){
    if(localStorage.getItem("tasklist")){
        tasklist=JSON.parse(localStorage.getItem("tasklist"))
    }else{
        const exampleTask1= new todo("First","Description","26-07-2023","High","fgssfdafsdafdsafsdaasdffdasasdfsdfafsdasdfasdafafsd",false);
        const exampleTask2= new todo("Second","","","","",true);
    }
    //projectList=JSON.parse(localStorage.getItem("projectlist"))
    console.log(tasklist)
}

const exampleProject1 = new project('firstproject');
const exampleProject2 = new project('secondproject');

exampleProject1.assignedTo=tasklist[0]
loadStorage()
//displayAllTasks();
//displayAllProjects()
loadPage();




