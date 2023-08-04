import { tasklist } from "./task";
let projectList=[];
let id
if(localStorage.getItem("projectId")){
    id=localStorage.getItem("taskId")
}else{
    id=0;
}
class project{
    constructor(name){
        this.name=name;
        this.id=id++;
        projectList.push(this)
    }
    delete(){
        tasklist.forEach(task => {
            if(task.assignedTo===this){
                task.delete();
            }
        });
        delete projectList[this.id];
    }
}

function addProjectToStorage(){
    localStorage.setItem("projectlist",JSON.stringify(projectList));
    localStorage.setItem("projectId",JSON.stringify(id));
}
function displayAllProjects(){
    projectList.forEach(element => {
        return console.log({...element})
    });
}
function addProject(name){
    if(name!==""){
        new project(name);
    }
}
export {project,displayAllProjects,projectList,addProject,addProjectToStorage}
