import {todo,taskList,addTask,taskId} from './task.js';
import {project,projectList,addProject,projectId} from './project.js';

function loadTaskId(){
    if(localStorage.getItem("taskId")){
        return localStorage.getItem("taskId")
    }else{
        return 0;
    }
}
function loadProjectId(){
    if(localStorage.getItem("projectId")){
        return localStorage.getItem("projectId")
    }else{
        return 0;
    }
}
function addToStorage(){
    localStorage.setItem("tasklist",JSON.stringify(taskList));
    localStorage.setItem("taskId",taskId);
    localStorage.setItem("projectlist",JSON.stringify(projectList));
    localStorage.setItem("projectId",projectId);
}
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
        addTask("Yoga","Yoga ","2023-07-26","High","Do 15 minutes of yoga",false,projectList[0]);
        addTask("Laundry","Do laundry","2023-07-27","Normal","",false,projectList[0]);
        addTask("Meeting","Meeting at 2pm","2023-07-25","High","Meeting with Charles on Teams about new project",true,projectList[1]);
    }
}
export {loadTaskId, loadProjectId, addToStorage, loadStorage}