import { format } from "date-fns";
let taskList=[];
let id
if(localStorage.getItem("taskId")){
    id=localStorage.getItem("taskId")
}else{
    id=0;
}
class todo{
    constructor(title,desc,dueDate,priority,notes,checklist){
        this.title=title;
        this.desc=desc;
        this.dueDate=dueDate;
        this.priority=priority;
        this.notes=notes;
        this.checklist=checklist;
        this.id=id++;
        taskList.push(this)
    }
    assignedTo="";
    displayCurrent(){
        console.log(this.title+" "+this.desc)
    }
}
function deleteTask(task){
    console.log(taskList)
    delete taskList[task.id];
}
function displayAllTasks(){
    taskList.forEach(element => {
        console.log(element)
    });
}
function addTaskToStorage(){
    localStorage.setItem("tasklist",JSON.stringify(taskList));
    localStorage.setItem("taskId",JSON.stringify(id));
}
function createTask(title,desc,dueDate,priority,notes,checklist){
    if(title!="" && desc!="" && dueDate!="" && priority!=""){
        let formattedDate=format(new Date(dueDate),'dd-MM-yyyy');
        return new todo(title,desc,formattedDate,priority,notes,checklist);
    }
}
export {todo,displayAllTasks,createTask,taskList,addTaskToStorage,deleteTask};