//create variables to store HTML objects that you will be frequently editing
//faster than using querySelector each time
//use "El" at the end of the variable name to indicate it represents an HTML Element
//use '#element-id' to access the HTML element by id
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//Event Handlers are functions that respond to an event, like a button click
var createTaskHandler = function() {
    //When you create an element, be sure to update its className so it can be
    //styled correctly by CSS
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "SLAY ME!";
    //appendChild adds the Element as a child inside the specified parent element
    tasksToDoEl.appendChild(listItemEl);
};

//Pass in a callback function, like an Event Handler, as the 2nd argument
//for addEventListener to make the event "do" something
buttonEl.addEventListener("click", createTaskHandler);



