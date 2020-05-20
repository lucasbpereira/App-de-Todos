var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');
var pointsElement = document.querySelector('.pointsTodo p');

var todos = JSON.parse(localStorage.getItem('listTodos')) || [];
var points = JSON.parse(localStorage.getItem('pointsTodos')) || 0;
function renderTodos() {
    listElement.innerHTML = '';

    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var deleteElement = document.createElement('a');
        deleteElement.setAttribute('href', '#');
        var pos = todos.indexOf(todo);
        deleteElement.setAttribute('onclick', 'deleteTodo('+ pos +')');
        deleteElement.setAttribute('id', 'delete');
        var deleteImg = document.createElement('img');
        deleteImg.setAttribute('src', '/svg/remove.svg')
        deleteElement.appendChild(deleteImg);

        var confirmElement = document.createElement('a');
        confirmElement.setAttribute('href', '#');
        var pos = todos.indexOf(todo);
        confirmElement.setAttribute('onclick', 'confirmTodo('+ pos +')');
        confirmElement.setAttribute('id', 'confirm');
        var confirmImg = document.createElement('img');
        confirmImg.setAttribute('src', '/svg/confirm.svg')
        confirmElement.appendChild(confirmImg);

        todoElement.appendChild(todoText);
        todoElement.appendChild(deleteElement);
        todoElement.appendChild(confirmElement);

        listElement.appendChild(todoElement);

        pointsElement.innerHTML = '';
        var createPoints = document.createTextNode(points);
        pointsElement.appendChild(createPoints);
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
    this.points-=10;
    alert('Você desistiu da tarefa :( ' + points);
    renderTodos();
    saveToStorage();
}

function confirmTodo(pos) {
    todos.splice(pos, 1);
    this.points+=10;
    alert(`Parabéns, você concluiu a tarefa :) ${points}`);
    renderTodos();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('listTodos', JSON.stringify(todos));
    localStorage.setItem('pointsTodos', JSON.stringify(points));
}

