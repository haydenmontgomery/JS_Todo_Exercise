//Declare our form, input and list
const form = document.querySelector('#add-task');
const input = document.querySelector('#task-name');
const todoList = document.querySelector('#todo-list');

//Clicking the remove button removes the LI and clicking the task will strikethrough or unstrikethrough.
todoList.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    } else if (e.target.tagName === 'LI'){
        if (e.target.classList.contains('completed')){
            e.target.classList.remove('completed');
            const items = todoList.children;
            let itemsArr = [].slice.call(items);

            //Sorting function. Put the unstruck task above strikethrough tasks.
            itemsArr.sort(function(a,b) {
                return a.classList.contains('completed') == b.classList.contains('completed')
                ? 0
                : (a.classList.contains('completed') ? 1: -1);
            })

            //Put list in the order
            for (let i = 0; i < itemsArr.length; i++) {
                todoList.appendChild(itemsArr[i]);
            }
        } else {
            e.target.classList.add('completed')
            todoList.appendChild(e.target);
        }
    }
})

//Form Listener. Creates both task and button. Then, puts it into the task list.
form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value === ""){

    }else {

    
    const newTask = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';

    newTask.innerText = input.value + " ";
    newTask.appendChild(removeBtn);
    todoList.prepend(newTask);
    input.value = '';
    }
})