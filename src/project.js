let projectList=[];
let id=0;
class project{
    constructor(name){
        this.name=name;
        this.id=id++;
        projectList.push(this)
    }
    delete(){
        this.assignedTasks.forEach(task => {
            task.delete();
        });
        this.assignedTasks="";
        delete projectList[this.id];
    }
    assignTask(task){
        task.assignedTo=this;
    }
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
export {project,displayAllProjects,projectList,addProject}
