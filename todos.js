var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('listTodos')) || [];

function renderTodos() {
    listElement.innerHTML = '';

    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var deleteElement = document.createElement('a');
        deleteElement.setAttribute('href', '#');
        var pos = todos.indexOf(todo);
        deleteElement.setAttribute('onclick', 'deleteTodo('+ pos +')');
        var deleteImg = document.createElement('img');
        deleteImg.setAttribute('src', '/svg/remove.svg')
        deleteElement.appendChild(deleteImg);

        var confirmElement = document.createElement('a');
        confirmElement.setAttribute('href', '#');
        confirmElement.setAttribute('onclick', 'confirmTodo('+ pos +')');
        confirmElement.setAttribute('class', 'confirm');
        var confirmImg = document.createElement('img');
        confirmImg.setAttribute('src', '/svg/confirm.svg')
        confirmElement.appendChild(confirmImg);



        todoElement.appendChild(todoText);
        todoElement.appendChild(deleteElement);
        todoElement.appendChild(confirmElement);

        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo() {
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = ('');
    renderTodos();
    saveToStorage();
}

btnElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

function confirmTodo() {
    const liElement = document.getElementsByTagName('li')[0];
    const cfrmElement = document.getElementsByTagName('confirm')[0];
    liElement.style.color = 'blue';
    liElement.style.textAlign = 'justify';
    renderTodos();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('listTodos', JSON.stringify(todos));
}