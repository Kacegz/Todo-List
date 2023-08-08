import './style.css';
import {todo,taskList,addTask} from './task.js';
import {project,projectList,addProject} from './project.js';
import loadPage from './dom';

function loadStorage(){
    if(localStorage.getItem("tasklist") && localStorage.getItem("projectlist")){
        taskList=JSON.parse(localStorage.getItem("tasklist"))
        taskList.forEach((taskElement,index) => {
            if(taskElement!=null){
                let newTaskElement=new todo(taskElement.title,taskElement.desc,taskElement.dueDate,taskElement.priority,taskElement.notes,taskElement.checklist,taskElement.assignedTo,taskElement.id)
                taskList[index]=newTaskElement
            }
        });
        projectList=JSON.parse(localStorage.getItem("projectlist"))
        projectList.forEach((projectElement,index) => {
            if(projectElement!=null){
                projectElement=new project(projectElement.name,projectElement.id)
                projectList[index]=projectElement
            }
        });
    }else{
        addProject('Home');
        addProject('Work');
        addTask("Yoga","Yoga ","26-07-2023","High","Do 15 minutes of yoga",false,projectList[0]);
        addTask("Laundry","Do laundry","27-07-2023","Normal","",false,projectList[0]);
        addTask("Meeting","Meeting at 2pm","25-07-2023","High","Meeting with Charles on Teams about new project",true,projectList[1]);
    }
}
loadStorage()
loadPage();