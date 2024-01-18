const form = document.querySelector('#add-task');
const input = document.querySelector('#task-name');
const todoList = document.querySelector('#todo-list');

todoList.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    }
})