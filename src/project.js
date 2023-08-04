import { taskList } from "./task";
let projectList=[];
let id
if(localStorage.getItem("projectId")){
    id=localStorage.getItem("projectId")
}else{
    id=0;
}
class project{
    constructor(name){
        this.name=name;
        this.id=id++;
        projectList.push(this)
    }
}
function deleteProject(project){
    taskList.forEach(task => {
        if(task!=undefined && task.assignedTo.id===project.id){
            delete taskList[task.id];
        }
    });
    delete projectList[project.id];
}
function addProjectToStorage(){
    localStorage.setItem("projectlist",JSON.stringify(projectList));
    localStorage.setItem("projectId",id);
}
function addProject(name){
    if(name!==""){
        new project(name);
    }
}
export {project,projectList,addProject,addProjectToStorage,deleteProject}
