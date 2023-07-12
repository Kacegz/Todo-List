let projectList=[];
let id=0;
class project{
    constructor(name){
        this.name=name;
        this.id=id++;
        projectList.push(this)
    }
    delete(){
        delete projectList[this.id];
    }
    assignedTasks=[];
    assignTask(task){
        this.assignedTasks.push(task);
    }
}
function displayAllProjects(){
    projectList.forEach(element => {
        return console.log({...element})
    });
}
export {project,displayAllProjects,projectList}
