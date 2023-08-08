import {createTask,taskList,addTaskToStorage,deleteTask,changeCheckList} from './task.js';
import {addProject,projectList,addProjectToStorage} from './project.js';
import { format } from "date-fns";
let activeProject

function displayProjects(){
    const projects=document.querySelector('#customprojects');
    projects.textContent="";
    projectList.forEach(project => {
        if(project!=undefined){
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
            customProjectDelete.addEventListener('click',()=>{
                console.log(project)
                project.deleteProject();
                refresh();
            })
            customProjectEdit.addEventListener('click',()=>{
                editProject(project)
            })
            customProject.appendChild(customProjectName);
            customProject.appendChild(customProjectEdit);
            customProject.appendChild(customProjectDelete);
            projects.appendChild(customProject);
        }
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
            const customTaskCheck=document.createElement('input');
            customTaskCheck.setAttribute("type","checkbox")
            if(task.checklist===true){//apply styles
                customTaskCheck.checked=true;
                customTask.classList.add('finished');
            }else{
                customTaskCheck.checked=false;
                customTask.classList.remove('finished');
            }
            customTaskCheck.addEventListener('click',()=>{
                changeCheckList(task);
                refresh();
            })
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
            customTaskEdit.addEventListener('click',()=>{editTask(task)});
            const customTaskDelete=document.createElement('div');
            customTaskDelete.classList.add('taskbutton');
            customTaskDelete.classList.add('deletebutton');
            customTaskDelete.addEventListener('click',()=>{deleteTaskDom(task.id)})
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
function deleteTaskDom(id){
    deleteTask(taskList[id])
    refresh();
}
function showTaskDetails(expandable){
    if(expandable.hidden!==false){
        expandable.hidden=false;
    }else{
        expandable.hidden=true;
    }
}
function clickHandler(){
    //Add event listener to display all projects
    const allProjects=document.querySelector('#allprojectbutton');
    allProjects.addEventListener('click',()=>{
        displayTasks(taskList);
        removeActiveClass();
        allProjects.classList.add('active');
    })
    //Add event listener for each project
    const projects=document.querySelectorAll('.customproject');
    projects.forEach(project => {
        project.addEventListener('click',()=>{
            activeProject=projectList[project.id];
            let tasksInProject=[]
            taskList.forEach(task => {
                if(task!=null && projectList[project.id]!=undefined && task.assignedTo.id==projectList[project.id].id){
                    tasksInProject.push(task)
                }
            });
            displayTasks(tasksInProject)
            highlightActive()            
        })
    });
}
function highlightActive(){
    removeActiveClass()
    if(activeProject!=undefined){
        const domActiveProject=document.querySelector('#'+CSS.escape(activeProject.id))
        domActiveProject.classList.add('active');
    }
}
function removeActiveClass(){
    const allProjects=document.querySelector('#allprojectbutton');
    allProjects.classList.remove('active');
    const allDomProjects=document.querySelectorAll('.customproject');
    allDomProjects.forEach(project=>{
        project.classList.remove('active');
    });
}
function projectModal(){
    //Show modal for new project
    const wrapper=document.querySelector("#wrapper");
    wrapper.textContent="";
    const label=document.createElement('label');
    label.setAttribute('for','name');
    label.id="name"
    label.textContent="Name for your new project:";
    const name=document.createElement('input');
    name.setAttribute('name','name');
    name.setAttribute('type','text');
    name.id="projectname";
    wrapper.appendChild(label);
    wrapper.appendChild(name);

    const buttons=document.createElement('div');
    buttons.classList.add('modalbuttons');
    const confirmButton=document.createElement('button');
    confirmButton.classList.add('modalbutton');
    confirmButton.id="projectconfirm";
    confirmButton.textContent="Confirm";
    const cancelButton=document.createElement('button');
    cancelButton.classList.add('modalbutton');
    cancelButton.value = "cancel";
    cancelButton.textContent="Cancel";
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);
    wrapper.appendChild(buttons)
    modal.close();
    modal.showModal();
}
function projectModalHandler(){
    projectModal();
    const name=document.querySelector('#projectname')
    const confirmButton=document.querySelector('#projectconfirm')
    confirmButton.addEventListener('click',(e)=>{
        if(name.value!==""){
            addProject(name.value);
        }else{
            wrongDataAlert();
        }
        refresh();
        name.value="";
    })
}
function editProject(project){
    projectModal();
    const input=document.querySelector('#projectname')
    const name=document.querySelector('#name');
    name.textContent="Set a new name:";
    const confirmButton=document.querySelector('#projectconfirm')
    confirmButton.addEventListener('click',(e)=>{
        if(input.value!=""){
            project.name=input.value;
            refresh();
        }
    })
}
function taskModal(){
    //show modal for new task 
    const wrapper=document.querySelector("#wrapper");
    wrapper.textContent="";
    const inputField=document.createElement('div');
    inputField.id="inputfield";
    const titleLabel=document.createElement('label');
    titleLabel.setAttribute('for','title');
    titleLabel.textContent="Title:";
    const title=document.createElement('input');
    title.setAttribute('name','title');
    title.setAttribute('type','text');
    title.id="title";
    const descLabel=document.createElement('label');
    descLabel.setAttribute('for','desc');
    descLabel.textContent="Description:";
    const desc=document.createElement('input');
    desc.setAttribute('name','desc');
    desc.setAttribute('type','text');
    desc.id="desc";
    const dateLabel=document.createElement('label');
    dateLabel.setAttribute('for','date');
    dateLabel.textContent="Due date:";
    const dateInput=document.createElement('input');
    dateInput.setAttribute('name','date');
    dateInput.setAttribute('type','date');
    dateInput.id="date";
    dateInput.valueAsDate=new Date()
    const priorityLabel=document.createElement('label');
    priorityLabel.setAttribute('for','priority');
    priorityLabel.textContent="Priority:";
    const priority=document.createElement('select');
    priority.setAttribute('name','priority');
    priority.id="priority";
    const firstOption=document.createElement('option');
    firstOption.value="High";
    firstOption.textContent="High";
    const secondOption=document.createElement('option');
    secondOption.value="Normal";
    secondOption.textContent="Normal";
    const thirdOption=document.createElement('option');
    thirdOption.value="Low";
    thirdOption.textContent="Low";
    priority.appendChild(firstOption);
    priority.appendChild(secondOption);
    priority.appendChild(thirdOption);
    const notesLabel=document.createElement('label');
    notesLabel.setAttribute('for','notes');
    notesLabel.textContent="Notes:";
    const notes=document.createElement('textarea');
    notes.setAttribute('name','notes');
    notes.setAttribute('cols','30');
    notes.setAttribute('rows','10');
    notes.id="notes";
    const projectLabel=document.createElement('label');
    projectLabel.setAttribute('for','project');
    projectLabel.textContent="Assign to project:";
    const assignProject=document.createElement('select');
    assignProject.setAttribute('name','project');
    assignProject.id="project";
    const checkLabel=document.createElement('label');
    checkLabel.setAttribute('for','check');
    checkLabel.textContent="Finished?";
    const check=document.createElement('input');
    check.setAttribute('name','check');
    check.setAttribute('type','checkbox');
    check.id="checklist";

    inputField.appendChild(titleLabel);
    inputField.appendChild(title);
    inputField.appendChild(descLabel);
    inputField.appendChild(desc);
    inputField.appendChild(dateLabel);
    inputField.appendChild(dateInput);
    inputField.appendChild(priorityLabel);
    inputField.appendChild(priority);
    inputField.appendChild(notesLabel);
    inputField.appendChild(notes);
    inputField.appendChild(projectLabel);
    inputField.appendChild(assignProject);
    inputField.appendChild(checkLabel);
    inputField.appendChild(check);

    wrapper.appendChild(inputField);

    const buttons=document.createElement('div');
    buttons.classList.add('modalbuttons');
    const confirmButton=document.createElement('button');
    confirmButton.classList.add('modalbutton');
    confirmButton.id="taskconfirm";
    confirmButton.textContent="Confirm";
    const cancelButton=document.createElement('button');
    cancelButton.classList.add('modalbutton');
    cancelButton.value = "cancel";
    cancelButton.textContent="Cancel";
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);
    wrapper.appendChild(buttons)
    modal.close()
    modal.showModal();
}
function taskModalHandler(){
    taskModal();
    const confirmButton=document.querySelector('#taskconfirm');
    const title=document.querySelector('#title');
    const desc=document.querySelector('#desc');
    const date=document.querySelector('#date');
    const priority=document.querySelector('#priority');
    const notes=document.querySelector('#notes');
    const assignProject=document.querySelector('#project');
    const checklist=document.querySelector('#checklist');
    
    confirmButton.addEventListener('click',()=>{
        if(title.value!="" && desc.value!="" && date.value!="" && priority.value!="" && assignProject.value!=""){
            let createdTask=createTask(title.value,desc.value,date.value,priority.value,notes.value,checklist.checked);
            createdTask.assignedTo=projectList[assignProject.value]
            refresh();
        }else{
            wrongDataAlert();
        }
    })
}
function editTask(task){
    taskModal();
    const confirmButton=document.querySelector('#taskconfirm');
    const title=document.querySelector('#title');
    const desc=document.querySelector('#desc');
    const date=document.querySelector('#date');
    const priority=document.querySelector('#priority');
    const notes=document.querySelector('#notes');
    const assignProject=document.querySelector('#project');
    const checklist=document.querySelector('#checklist');
    checklist.parentNode.removeChild(checklist);//checklist not needed here
    const checkLabel=document.querySelector('[for="check"]');
    checkLabel.parentNode.removeChild(checkLabel)
    projectSelectModal();
    confirmButton.addEventListener('click',()=>{
        if(title.value!=""){
            task.title=title.value;
        }
        if(desc.value!=""){
            task.desc=desc.value;
        }
        if(date.value!=""){
            task.dueDate=format(new Date(date.value),'dd-MM-yyyy');
        }
        if(priority.value!=""){
            task.priority=priority.value;
        }
        if(notes.value!=""){
            task.notes=notes.value;
        }
        if(assignProject.value!=""){
            task.assignedTo=projectList[assignProject.value];
        }
        refresh();
    })
}
function projectSelectModal(){//refreshes projects in task modal
    const assignProject=document.querySelector('#project');
    assignProject.textContent="";
    projectList.forEach(project => {
        if(project!=undefined){
            const availableProjects=document.createElement('option');
            availableProjects.setAttribute('value',project.id)
            availableProjects.setAttribute('class','projectoption')
            availableProjects.textContent=project.name;
            assignProject.appendChild(availableProjects)
        }
    });
}
function modalClickHandler(){
    const newProjectButton=document.querySelector('#newproject');
    newProjectButton.addEventListener('click',()=>{
        projectModalHandler();
    })
    const newTaskButton=document.querySelector('#newtask')
    newTaskButton.addEventListener('click',()=>{
        taskModalHandler();
        projectSelectModal();
    })
}
function wrongDataAlert(){
    const wrapper=document.querySelector("#wrapper");
    wrapper.textContent="Enter valid data";
    const cancelButton=document.createElement('button');
    cancelButton.classList.add('modalbutton');
    cancelButton.value = "Close";
    cancelButton.textContent="Close";
    wrapper.appendChild(cancelButton)
    modal.close()
    modal.showModal();
}
function refresh(){//refresh tasks and projects
    addTaskToStorage();
    addProjectToStorage();
    document.querySelector('#allprojectbutton').classList.add('active');
    displayTasks(taskList);
    displayProjects();
    clickHandler();
}

function loadPage(){
    displayTasks(taskList);
    displayProjects();
    clickHandler();
    modalClickHandler();
}
export default loadPage