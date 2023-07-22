import {todo,createTask,tasklist} from './task.js';
import {project,addProject,projectList} from './project.js';

let activeProject

function displayProjects(){
    const projects=document.querySelector('#customprojects');
    projects.textContent="";
    projectList.forEach(project => {
        const customProject=document.createElement('div');
        customProject.classList.add('customproject')
        customProject.id=project.id;
        project.domElement=customProject;
        const customProjectName=document.createElement('h3');
        customProjectName.textContent=project.name;
        const customProjectEdit=document.createElement('div');
        customProjectEdit.classList.add('projectbutton');
        customProjectEdit.classList.add("projectedit");
        const customProjectDelete=document.createElement('div');
        customProjectDelete.classList.add('projectbutton');
        customProjectDelete.classList.add("projectdelete");

        customProjectDelete.addEventListener('click',()=>{project.delete();refresh();})
        customProjectEdit.addEventListener('click',()=>{editProject(project)})

        customProject.appendChild(customProjectName);
        customProject.appendChild(customProjectEdit);
        customProject.appendChild(customProjectDelete);
        projects.appendChild(customProject);
    });
}
function displayTasks(array){
    const tasks=document.querySelector('#tasks');
    tasks.textContent="";
    array.forEach(task => {
        
        const customTask=document.createElement('div');
        customTask.classList.add('customtask');
        if(task!=undefined){
            const customTaskTitle=document.createElement('h3');
            customTaskTitle.textContent=task.title;
            customTaskTitle.classList.add('title')
            const customTaskOptions=document.createElement('div');
            customTaskOptions.classList.add('options');

            const customTaskDue=document.createElement('p');
            customTaskDue.textContent=task.dueDate;
            const customTaskExpand=document.createElement('div');
            customTaskExpand.classList.add('taskbutton');
            customTaskExpand.classList.add('expandbutton');

            //styling for task details section
            const expandable=document.createElement('div');
            expandable.classList.add('expandable');
            const details=document.createElement('div');
            details.classList.add('details');
            const desc=document.createElement('div');
            const descHeader=document.createElement('h3');
            descHeader.textContent="Description:";
            const descContent=document.createElement('p');
            descContent.textContent=task.desc;
            desc.appendChild(descHeader);
            desc.appendChild(descContent);
            const notes=document.createElement('div');
            const notesHeader=document.createElement('h3');
            notesHeader.textContent="Notes:"
            const notesContent=document.createElement('p');
            notesContent.textContent=task.notes
            notes.appendChild(notesHeader);
            notes.appendChild(notesContent);
            details.appendChild(desc);
            details.appendChild(notes)
            expandable.appendChild(details);
            expandable.hidden=true;

            customTaskExpand.addEventListener("click",()=>{showTaskDetails(expandable)})
            //
            const customTaskCheck=document.createElement('input');
            customTaskCheck.setAttribute("type","checkbox")
            if(task.checklist===true){//apply styles
                customTaskCheck.checked=true;
                customTask.classList.add('finished');
            }else{
                customTaskCheck.checked=false;
                customTask.classList.remove('finished');
            }
            customTaskCheck.addEventListener('click',()=>{changeCheckList(task)})
            customTaskCheck.classList.add('taskbutton');
            customTaskCheck.classList.add('checklist');
            switch(task.priority){
                case 'High': 
                    customTask.setAttribute('style','border-color:red;')
                    break;
                case 'Normal':
                    customTask.setAttribute('style','border-color:yellow;')
                    break;
                case 'Low':
                    customTask.setAttribute('style','border-color:green;')
                    break;
            }

            const customTaskEdit=document.createElement('div');
            customTaskEdit.classList.add('taskbutton');
            customTaskEdit.classList.add('editbutton');

            const customTaskDelete=document.createElement('div');
            customTaskDelete.classList.add('taskbutton');
            customTaskDelete.classList.add('deletebutton');
            customTaskDelete.addEventListener('click',()=>{deleteTask(task.id)})
            customTaskOptions.appendChild(customTaskDue);
            customTaskOptions.appendChild(customTaskExpand);
            customTaskOptions.appendChild(customTaskCheck);
            customTaskOptions.appendChild(customTaskEdit);
            customTaskOptions.appendChild(customTaskDelete);

            customTask.appendChild(customTaskTitle);
            customTask.appendChild(customTaskOptions)

            customTask.appendChild(expandable);

            tasks.appendChild(customTask);
        }
    });
}
function deleteTask(id){
    tasklist[id].delete()
    refresh();
}
function changeCheckList(task){
        if(task.checklist===true){
            task.checklist=false;
            refresh()
        }else{
            task.checklist=true;
            refresh()
        }
}
function showTaskDetails(expandable){
    if(expandable.hidden!==false){
        expandable.hidden=false;
    }else{
        expandable.hidden=true;
    }
}
/*
    const buttons=document.querySelector('.modalbuttons');
    const confirmButton=document.createElement('div').classList.add('modalbutton');
    confirmButton.id="taskconfirm";
    confirmButton.textContent="Confirm";
    const cancelButton=document.createElement('div').classList.add('modalbutton');
    cancelButton.setAttribute('value','cancel')
    cancelButton.textContent="Cancel";
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);
*/
function projectClickHandler(){
    //Add event listener to display all projects
    const allProjects=document.querySelector('#allprojectbutton');
    allProjects.addEventListener('click',()=>{displayTasks(tasklist);})
    //Add event listener for each project
    const projects=document.querySelectorAll('.customproject');
    projects.forEach(project => {
        project.addEventListener('click',()=>{
            if(projectList[project.id]!==undefined){//prevent from adding into non-existent and causing error
                displayTasks(projectList[project.id].assignedTasks)
                activeProject=projectList[project.id];
            }
        })
    });
}
/*function deleteButton(id){
    const allDeleteButtons=document.querySelectorAll('.deletebutton');
    allDeleteButtons.forEach(button => {
        button.addEventListener('click',()=>{
            tasklist[id].delete();
            refresh();
        })
    });
}*/

function projectModal(){
    //Show modal for new project
    const newProjectButton=document.querySelector('#newproject')
    const modal=document.querySelector("#modal");
    newProjectButton.addEventListener('click',()=>{modal.showModal()})
    const inputfield=document.querySelector("#inputfield");
    const label=document.createElement('label');
    label.setAttribute('for','name');
    const text=document.createElement('p');
    text.classList.add("projectmodalmessage");
    text.textContent="Name for your new project:";
    label.appendChild(text);
    const name=document.createElement('input');
    name.setAttribute('name','name');
    name.setAttribute('type','text');
    name.id="projectname";
    inputfield.appendChild(label);
    inputfield.appendChild(name);
    const confirmButton=document.querySelector('#projectconfirm');
    
    confirmButton.addEventListener('click',(e)=>{
        addProject(name.value);
        refresh();
        name.value="";
    })
}
function editProject(project){
    const modal=document.querySelector("#modal");
    const message=document.querySelector('.projectmodalmessage');
    message.textContent="Set a new name:";
    const input=document.querySelector('#projectname')
    modal.showModal()

    /*confirmButton.addEventListener('click',(e)=>{
        if(input.value!=""){
            project.name=input.value;
        }
    })*/
}
function taskModal(){
    //show modal for new task 
    const newTaskButton=document.querySelector('#newtask')
    const modal=document.querySelector("#taskmodal");
    newTaskButton.addEventListener('click',()=>{
        modal.showModal();
        projectSelectModal();//refresh with every click
    })
    const inputfield=document.querySelector('#inputfield');
    const title=document.querySelector('#title');
    const desc=document.querySelector('#desc');
    const date=document.querySelector('#date');
    const priority=document.querySelector('#priority');
    const notes=document.querySelector('#notes');
    const checklist=document.querySelector('#checklist');
    const assignProject=document.querySelector('#project');
    const confirmButton=document.querySelector('#taskconfirm');
    confirmButton.addEventListener('click',()=>{
        let createdTask=createTask(title.value,desc.value,date.value,priority.value,notes.value,checklist.checked);
        projectList[assignProject.value].assignTask(createdTask)
        refresh();
    })
}
function projectSelectModal(){//without this you wont be able to pick a new project in modal (refreshes it)
    const assignProject=document.querySelector('#project');
    assignProject.textContent="";
    projectList.forEach(project => {
        const availableProjects=document.createElement('option');
        availableProjects.setAttribute('value',project.id)
        availableProjects.setAttribute('class','projectoption')
        availableProjects.textContent=project.name;
        assignProject.appendChild(availableProjects)
    });
}
/*function highlightActive(){
    //first time assigned class variable to dom element...
    activeProject.domElement.style.borderColor="red";
    console.log(activeProject)
}*/
function refresh(){//refresh tasks and projects
    displayTasks(tasklist);
    displayProjects();
    projectClickHandler();

}

function updateScreen(){//add everything with event listeners for modals
    displayTasks(tasklist);
    displayProjects();
    projectClickHandler();
    projectModal();
    taskModal();
}
export {updateScreen}