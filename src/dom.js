import {todo,createTask,tasklist} from './task.js';
import {project,projectList} from './project.js';

let activeProject

function displayProjects(){
    const projects=document.querySelector('#customprojects');
    projects.textContent="";
    projectList.forEach(e => {
        const customProject=document.createElement('div');
        customProject.classList.add('customproject')
        customProject.id=e.id;
        const customProjectName=document.createElement('h3');
        customProjectName.textContent=e.name;
        customProject.appendChild(customProjectName);
        projects.appendChild(customProject);
    });
}
function displayTasks(array){
    const tasks=document.querySelector('#tasks');
    tasks.textContent="";
    array.forEach(e => {
        const customTask=document.createElement('div');
        customTask.classList.add('customtask')
        customTask.id=e.id;
        const customTaskTitle=document.createElement('h3');
        customTaskTitle.textContent=e.title;
        customTaskTitle.classList.add('title')
        const customTaskOptions=document.createElement('div');
        customTaskOptions.classList.add('options');

        const customTaskDue=document.createElement('p');
        customTaskDue.textContent=e.dueDate;
        const customTaskExpand=document.createElement('div');
        customTaskExpand.classList.add('taskbutton');
        customTaskExpand.textContent="V";
        const customTaskCheck=document.createElement('input');
        customTaskCheck.setAttribute("type","checkbox")
        if(e.checklist==="True"){/////////////////////////////////////put it in a click event
            customTaskCheck.checked=true;
            customTask.setAttribute("style","filter:contrast(10%);")
        }
        customTaskCheck.classList.add('taskbutton');
        const customTaskEdit=document.createElement('div');
        customTaskEdit.classList.add('taskbutton');
        customTaskEdit.textContent="e";
        const customTaskDelete=document.createElement('div');
        customTaskDelete.classList.add('taskbutton');
        customTaskDelete.textContent="X"
        customTaskOptions.appendChild(customTaskDue);
        customTaskOptions.appendChild(customTaskExpand);
        customTaskOptions.appendChild(customTaskCheck);
        customTaskOptions.appendChild(customTaskEdit);
        customTaskOptions.appendChild(customTaskDelete);

        customTask.appendChild(customTaskTitle);
        customTask.appendChild(customTaskOptions)
        tasks.appendChild(customTask);
    });
}
function clickHandler(){
    //Display all tasks
    const allProjects=document.querySelector('#allprojects');
    allProjects.addEventListener('click',()=>{displayTasks(tasklist);})

    //Display tasks in specific project
    const projects=document.querySelectorAll('.customproject');
    projects.forEach(e => {
        e.addEventListener('click',()=>{console.log(projectList[e.id].assignedTasks)
            displayTasks(projectList[e.id].assignedTasks)
            activeProject=projectList[e.id];
        })
    });
}
function userInput(){
        //Show modal for new project
        const newProjectButton=document.querySelector('#newproject')
        const modal=document.querySelector("#modal");
        newProjectButton.addEventListener('click',()=>{modal.showModal()})

        const inputfield=document.querySelector("#inputfield");
        const label=document.createElement('label');
        label.setAttribute('for','name');
        const text=document.createElement('p');
        text.textContent="Name for your new project:";
        label.appendChild(text);
        const name=document.createElement('input');
        name.setAttribute('name','name');
        name.id="projectname";

        inputfield.appendChild(label);
        inputfield.appendChild(name);

        const confirmButton=document.querySelector('#confirm');
        
        confirmButton.addEventListener('click',(e)=>{
            new project(name.value);
            refresh();
            name.value="";
        })
        //Add new task
}
function refresh(){
    displayTasks(tasklist);
    displayProjects();
    clickHandler();
}

function updateScreen(){
    displayTasks(tasklist);
    displayProjects();
    clickHandler();
    userInput();
}
export {updateScreen}