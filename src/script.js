import './style.css';
import {todo,displayAllTasks} from './task.js';
import {project,displayAllProjects} from './project.js';
import {updateScreen} from './dom';

const exampleProject1 = new project('firstproject');
const exampleProject2 = new project('secondproject');
const exampleTask1= new todo("First","Description","12.12.2023","High","notes",false);
const exampleTask2= new todo("Second","","","","",true);

exampleProject1.assignTask(exampleTask1);
displayAllTasks();
displayAllProjects()
updateScreen();
exampleTask1.displayCurrent();



