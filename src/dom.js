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
            customTaskEdit.addEventListener('click',()=>{editTask(task)});
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
        addProject(name.value);
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
    checkLabel.textContent="Finished?:";
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
        let createdTask=createTask(title.value,desc.value,date.value,priority.value,notes.value,checklist.checked);
        projectList[assignProject.value].assignTask(createdTask)
        refresh();
    })
}
function editTask(task){
    taskModal();
    //
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
            task.dueDate=date.value;
        }
        if(priority.value!=""){
            task.priority=priority.value;
        }
        if(notes.value!=""){
            task.notes=notes.value;
        }
        console.log(task.getAssignedProjects())

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
function modalClickHandler(){
    const newProjectButton=document.querySelector('#newproject');
    newProjectButton.addEventListener('click',()=>{
        projectModalHandler();
    })
    const newTaskButton=document.querySelector('#newtask')
    newTaskButton.addEventListener('click',()=>{
        taskModalHandler();
        projectSelectModal();//refresh with every click
    })
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
    modalClickHandler();
}
export {updateScreen}