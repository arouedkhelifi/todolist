//retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoinput= document.getElementById("todoinput");
const todocount= document.getElementById("todocount");
const addbutton = document.querySelector(".button");
const deletebutton= document.getElementById("deletebutton");
const todolist = document.getElementById("todolist");

//initialize
document.addEventListener("DOMContentLoaded", function () {
    addbutton.addEventListener("click", addTask);
    todoinput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevents default Enter key behavior
        addTask();
      }
    });
    deletebutton.addEventListener("click", deletealltasks);
    displaytasks();
  });
function addTask(){
const newtask= todoinput.value.trim();
if(newtask!== ""){
    todo.push({
        text: newtask, disabled: false
    });
    saveToLocalStorage();
    todoinput.value ="";
    displaytasks();

    }
}

function deletealltasks(){
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }

function displaytasks(){
    todolist.innerHTML = "";
    todo.forEach((item, index) => {
      const p = document.createElement("p");
      p.innerHTML = `
        <div class="todo-container">
          <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
        item.disabled ? "checked" : ""
      }>
          <p id="todo-${index}" class="${
        item.disabled ? "disabled" : ""
      }" onclick="edittask(${index})">${item.text}</p>
        </div>
      `;
      p.querySelector(".todo-checkbox").addEventListener("change", () =>
        toggleTask(index)
      );
      todolist.appendChild(p);
    });
    todocount.textContent = todo.length;


}
function edittask(index){
    const todoitem =document.getElementById(`todo-${index}`);
    const existingtext= todo[index].text;
    const inputelement=document.createElement("input");
    inputelement.value=existingtext;
    todoitem.replaceWith(inputelement);
    inputelement.focus();
    inputelement.addEventListener("blur", function(){
        const updatedtext=inputelement.value.trim();
        if(updatedtext){
            todo[index].text=updatedtext;
            saveToLocalStorage();
        }
        displaytasks();
    }

)
}
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displaytasks();
  }
            
    


function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));

}


