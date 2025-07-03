function loadTodos(){
    //This function will load the todos from browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}

function refreshTodos(todos){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToLocalStorage(todo){
    const todos = loadTodos();
    todos.todoList.push({...todo});
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todo){
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id", todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompleted){
        textDiv.classList.add("completed")
    }

    textDiv.textContent = todo.text;
    todoItem.classList.add("todoItem");

    const wrapper = document.createElement("div")
    wrapper.classList.add("todoButtons")

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", deleteTodo);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompleted) ? "Reset" :"Completed";
    completedBtn.classList.add("completedBtn");
    completedBtn.addEventListener("click", toggleTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv)
    todoItem.appendChild(wrapper)

    todoList.appendChild(todoItem);
}

function executeFilterAction(event){
    // console.log(event.target);
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    // console.log(value);
    todoList.innerHTML = '';
    const todos = loadTodos();
    if(value == "all"){
        console.log(todoList);
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        })
    }else if(value == "pending"){
        todos.todoList.forEach(todo => {
            if(todo.isCompleted !== true)
                appendTodoInHtml(todo);
        })
    }else{
        todos.todoList.forEach(todo => {
            if(todo.isCompleted === true)
                appendTodoInHtml(todo);
        })
    }
}

function resetHtmlTodos(todos){
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
}

function toggleTodo(event){
    console.log("toggling")
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if(todo.id == todoId){
            todo.isCompleted = !todo.isCompleted;
        }
    });
    console.log(todos);
    refreshTodos(todos);
    resetHtmlTodos(todos);
}

function deleteTodo(event){
    console.log("deleting");
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    console.log(todoId);
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.id != todoId);
    refreshTodos(todos);
    resetHtmlTodos(todos);
}


document.addEventListener("DOMContentLoaded", () => {

    const todoInput = document.getElementById("todoInput");

    const SubmitButton = document.getElementById("addTodo");

    let todos = loadTodos();

    const todoList = document.getElementById("todoList");

    const filterBtns = document.getElementsByClassName("filterBtn");
    console.log(filterBtns);
    for(btn of filterBtns){
        console.log(btn);
        btn.addEventListener("click", executeFilterAction);
    }

    SubmitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if(todoText == ''){
            alert("Please write something for the todo");
        }else{
            todos = loadTodos();
            console.log(todos);
            const id = todos.todoList.length;
            addTodoToLocalStorage({text: todoText, isCompleted: false, id});
            appendTodoInHtml({text: todoText, isCompleted: false, id});
            todoInput.value = '';
        }
    });

    todoInput.addEventListener("change", (event) => {
        //This call back method is fired everytime there is a change in a input tag
        const todoText = event.target.value;

        event.target.value = todoText.trim();

        console.log(event.target.value)
    });

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

});