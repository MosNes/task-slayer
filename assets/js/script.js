//counter for generating unique task IDs
var taskIdCounter = 0;

//create variables to store HTML objects that you will be frequently editing
//faster than using querySelector each time
//use "El" at the end of the variable name to indicate it represents an HTML Element
//use '#element-id' to access the HTML element by id
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

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

    //package data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //passes the object to the createTaskEl function
    createTaskEl(taskDataObj);
    
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

var taskButtonHandler = function(event) {
    console.log(event.target);
};

pageContentEl.addEventListener("click",taskButtonHandler);