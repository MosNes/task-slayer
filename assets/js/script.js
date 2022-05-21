//counter for generating unique task IDs
var taskIdCounter = 0;

var tasks = [];


//create variables to store HTML objects that you will be frequently editing
//faster than using querySelector each time
//use "El" at the end of the variable name to indicate it represents an HTML Element
//use '#element-id' to access the HTML element by id
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
//save the three columns to variables
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//Event Handlers are functions that respond to an event, like a button click
var taskFormHandler = function(event) {
    //prevents the default behavior of the browser, such as refreshing on form submit
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("FINISH FILLING OUT THE TASK FORM, MORTAL");
        return false;
    }

    formEl.reset();

    //check for presence of edit id
    var isEdit = formEl.hasAttribute("data-task-id");
    
    //if the data-task-id attribut exists
    if (isEdit) {
        // get task Id and run the edit function
        var taskId = formEl.getAttribute("data-task-id");
        completedEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        //package data as object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "Task to Slay"
        };


        //passes the object to the createTaskEl function
        createTaskEl(taskDataObj);
    }
    
};

//function that creates a single Task Element
var createTaskEl = function(taskDataObj) {
    //When you create an element, be sure to update its className so it can be
    //styled correctly by CSS
    
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    //create div to hold task info and list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>"+taskDataObj.name+"</h3><span class='task-type'>"+taskDataObj.type+"</span>";

    //appendChild adds the Element as a child inside the specified parent element
    //add the taskInfo div into the list item
    listItemEl.appendChild(taskInfoEl);

    //create tasks using the current task-id
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //add task Id to the task object
    taskDataObj.id = taskIdCounter;
    //add the task object to the tasks array
    tasks.push(taskDataObj);

    //increment task counter by one for the next unique id
    taskIdCounter++;
};

//function to create form buttons unique to each individual task, referencing their task-id
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //create dropdown menu
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    //array that holds dropdown choices
    var statusChoices = ["Task to Slay","In Progress","Slain!"];

    //for loop creates an option element for each item in the statusChoices array
    for (var i = 0; i<statusChoices.length; i++){
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        //append to select element
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

//Pass in a callback function, like an Event Handler, as the 2nd argument
//for addEventListener to make the event "do" something
formEl.addEventListener("submit",taskFormHandler);

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    taskSelected.remove();

    var updatedTaskArr = [];

    for (var i = 0; i < tasks.length; i++) {
        //if task[i].id does not match value of taskId, keep that task and push to new array
        if (task[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTaskArr;

};

//second part of the edit task function
var completedEditTask = function(taskName, taskType, taskId) {
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //also update values of tasks saved to the task array
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    console.log(tasks);

    alert("Task Updated!");
    
    //reset form by removing the data-task-id attribute
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

//first part of the edit task function
var editTask = function(taskId) {
    console.log("editing task #"+taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Edits";
    formEl.setAttribute("data-task-id", taskId);

};

//handles button clicks
var taskButtonHandler = function(event) {
    //get target from event
    var targetEl = event.target;

    //filter for the type of event to capture
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (targetEl.matches(".delete-btn")) {
        //get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//handles edits to the status form field of tasks
var taskStatusChangeHandler = function(event){
    //get task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and conver to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "slain!") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    else if (statusValue === "task to slay") {
        tasksToDoEl.appendChild(taskSelected);
    }

    //update task status in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    };
    console.log(tasks);

};

//listens for clicks inside of the <main> element
pageContentEl.addEventListener("click",taskButtonHandler);

//listens for form field changes inside of the <main> element
pageContentEl.addEventListener("change",taskStatusChangeHandler);