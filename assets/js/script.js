//create variables to store HTML objects that you will be frequently editing
//faster than using querySelector each time
//use "El" at the end of the variable name to indicate it represents an HTML Element
//use '#element-id' to access the HTML element by id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//Event Handlers are functions that respond to an event, like a button click
var taskFormHandler = function(event) {
    //prevents the default behavior of the browser, such as refreshing on form submit
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

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

    //create div to hold task info and list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>"+taskDataObj.name+"</h3><span class='task-type'>"+taskDataObj.type+"</span>";

    //appendChild adds the Element as a child inside the specified parent element
    //add the taskInfo div into the list item
    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

//Pass in a callback function, like an Event Handler, as the 2nd argument
//for addEventListener to make the event "do" something
formEl.addEventListener("submit",taskFormHandler);


