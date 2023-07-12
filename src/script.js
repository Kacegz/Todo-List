import './style.css';
import {todo,displayAllTasks} from './task.js';
import {project,displayAllProjects} from './project.js';
import {updateScreen} from './dom';

const exampleProject1 = new project('firstproject');
const exampleProject2 = new project('secondproject');
const exampleTask1= new todo("First","","","","","");
const exampleTask2= new todo("Second","","","","","");

exampleTask1.assignProject=exampleProject1;
displayAllTasks();
displayAllProjects()
updateScreen();
updateScreen();
exampleTask1.displayCurrent();



