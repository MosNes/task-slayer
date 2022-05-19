//create variables to store HTML objects that you will be frequently editing
//faster than using querySelector each time
//use "El" at the end of the variable name to indicate it represents an HTML Element
//use '#element-id' to access the HTML element by id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//Event Handlers are functions that respond to an event, like a button click
var createTaskHandler = function(event) {
    //prevents the default behavior of the browser, such as refreshing on form submit
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    
    //When you create an element, be sure to update its className so it can be
    //styled correctly by CSS

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>"+taskNameInput+"</h3><span class='task-type'>"+taskTypeInput+"</span>";

    //appendChild adds the Element as a child inside the specified parent element
    //add taskInfoEl div into the listItemEl li:
    listItemEl.appendChild(taskInfoEl);

    //add listItemEl li into the tasksToDoEl ul:
    tasksToDoEl.appendChild(listItemEl);
};

//Pass in a callback function, like an Event Handler, as the 2nd argument
//for addEventListener to make the event "do" something
formEl.addEventListener("submit",createTaskHandler);


