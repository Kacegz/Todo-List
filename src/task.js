import { format } from 'date-fns';
import { loadTaskId } from './localstorage';

let taskList = [];
let id = loadTaskId();
class todo {
  constructor(
    title,
    desc,
    dueDate,
    priority,
    notes,
    checklist,
    assignedTo,
    id,
  ) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.assignedTo = assignedTo;
    this.id = id;
  }

  deleteTask() {
    delete taskList[this.id];
  }

  changeCheckList() {
    if (this.checklist === true) {
      this.checklist = false;
    } else {
      this.checklist = true;
    }
  }
}
function addTask(title, desc, dueDate, priority, notes, checklist, assignedTo) {
  if (title != '' && desc != '' && dueDate != '' && priority != '') {
    let formattedDate = format(new Date(dueDate), 'dd-MM-yyyy');
    let newTask = new todo(
      title,
      desc,
      formattedDate,
      priority,
      notes,
      dueDate,
      assignedTo,
      id,
    );
    id++;
    taskList.push(newTask);
  }
}
export { todo, addTask, taskList, id as taskId };
