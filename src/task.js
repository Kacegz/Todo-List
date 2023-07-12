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
        delete tasklist[this.id];
    }
}
function displayAllTasks(){
    tasklist.forEach(element => {
        console.log(element)
    });
}
function createTask(title,desc,dueDate,priority,notes,checklist){
    if(title!=null){
        new todo(title,desc,dueDate,priority,notes,checklist)
    }
}
export {todo,displayAllTasks,createTask,tasklist};