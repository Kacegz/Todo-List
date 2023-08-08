import { taskList } from "./task";
let projectList=[];
let id
if(localStorage.getItem("projectId")){
    id=localStorage.getItem("projectId")
}else{
    id=0;
}
class project{
    constructor(name,id){
        this.name=name;
        this.id=id;
    }
    deleteProject(){
        taskList.forEach(task => {
            if(task!=undefined && task.assignedTo.id===this.id){
                delete taskList[task.id];
            }
        });
        delete projectList[this.id];
    };
}
function addProjectToStorage(){
    localStorage.setItem("projectlist",JSON.stringify(projectList));
    localStorage.setItem("projectId",id);
}
function addProject(name){
    if(name!==""){
        let createdProject=new project(name,id);
        id++;
        projectList.push(createdProject)
    }
}
export {project,projectList,addProject,addProjectToStorage}
