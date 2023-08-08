import { taskList } from "./task";
import { loadProjectId } from "./localstorage";
let projectList=[];
let id=loadProjectId();
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
function addProject(name){
    if(name!==""){
        let createdProject=new project(name,id);
        id++;
        projectList.push(createdProject)
    }
}
export {project, projectList, addProject, id as projectId}
