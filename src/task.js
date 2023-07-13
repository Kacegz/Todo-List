import { projectList } from "./project";
let tasklist=[];
let id=0;
class todo{
    constructor(title,desc,dueDate,priority,notes,checklist){
        this.title=title;
        this.desc=desc;
        this.dueDate=dueDate;
        this.priority=priority;
        this.notes=notes;
        this.checklist=checklist;
        this.id=id++;
        tasklist.push(this)
    }
    displayCurrent(){
        console.log(this.title+" "+this.desc)
    }
    delete(){
        //tasklist[this.id]=undefined
        delete tasklist[this.id];
        //some weird spaghetti below
        projectList.forEach(e => {
            //loop for each project
            e.assignedTasks.forEach((element,index) => {
                //for each task in project search for this one and set to undefined
                if(element==this){
                    e.assignedTasks[index]=undefined;
                }
            });
        });
    }
}
function displayAllTasks(){
    tasklist.forEach(element => {
        console.log(element)
    });
}
function createTask(title,desc,dueDate,priority,notes,checklist,){
    if(title!="" && desc!="" && dueDate!="" && priority!=""){
        return new todo(title,desc,dueDate,priority,notes,checklist)
    }
}
export {todo,displayAllTasks,createTask,tasklist};