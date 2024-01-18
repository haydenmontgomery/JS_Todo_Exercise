//Declare our form, input and list
const form = document.querySelector('#add-task');
const input = document.querySelector('#task-name');
const todoList = document.querySelector('#todo-list');


//Pull from local storage
const savedFile = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(savedFile);

//Create the line element with the button
for (let i = 0; i < savedFile.length; i++) {
    const newTask = document.createElement("li");
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';

    newTask.textContent = savedFile[i].task;
    newTask.strikethrough = savedFile[i].strikethrough ? true : false;
    newTask.appendChild(removeBtn);
    if (newTask.strikethrough) {
        newTask.classList.add('completed');
        todoList.append(newTask);
    } else{    
    todoList.prepend(newTask);
    }
}

//Clicking the remove button removes the LI and clicking the task will strikethrough or unstrikethrough.
todoList.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    } else if (e.target.tagName === 'LI'){
        //If completed, you can now "uncomplete"
        if (e.target.classList.contains('completed')){
            e.target.classList.remove('completed');
            const items = todoList.children;
            console.log(todoList);
            console.log(items);
            let itemsArr = [].slice.call(items);

            //Sorting function. Put the unstruck task above strikethrough tasks.
            itemsArr.sort(function(a,b) {
                return a.classList.contains('completed') == b.classList.contains('completed')
                ? 0
                : (a.classList.contains('completed') ? 1: -1);
            })

            //Clear the saved file since we are going to have a new order
            //for (let mem in savedFile) delete savedFile[mem];
            let newFile = [];
            //Put list in the order and save
            for (let i = 0; i < itemsArr.length; i++) {
                todoList.appendChild(itemsArr[i]);
                if(itemsArr[i].classList.contains('completed')){
                    newFile.push({ task: itemsArr[i].childNodes[0].textContent, strikethrough: true});
                    localStorage.setItem("tasks", JSON.stringify(newFile));
                    console.log(newFile);
                } else{
                    newFile.push({ task: itemsArr[i].childNodes[0].textContent, strikethrough: false});
                    localStorage.setItem("tasks", JSON.stringify(newFile));
                    console.log(newFile);
                }
                                
            }
        //Otherwise, complete it.
        } else {

            e.target.classList.add('completed')
            todoList.appendChild(e.target);

            let newFile = [];
            const items = todoList.children;
            console.log(items);
            console.log(todoList);
            let itemsArr = [].slice.call(items);
            for (things in itemsArr){
                console.log("SERSEFSEJIFSJEF" + itemsArr[things]);
            }
            itemsArr.sort(function(a,b) {
                return a.classList.contains('completed') == b.classList.contains('completed')
                ? 0
                : (a.classList.contains('completed') ? 1: -1);
            })

            for (let i = 0; i < itemsArr.length; i++) {
                todoList.appendChild(itemsArr[i]);
                if(itemsArr[i].classList.contains('completed')){
                    newFile.push({ task: itemsArr[i].childNodes[0].textContent, strikethrough: true});
                    localStorage.setItem("tasks", JSON.stringify(newFile));
                    console.log(newFile);
                } else{
                    newFile.push({ task: itemsArr[i].childNodes[0].textContent, strikethrough: false});
                    localStorage.setItem("tasks", JSON.stringify(newFile));
                    console.log(newFile);
                }
            }
    
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

    newTask.textContent = input.value + " ";
    newTask.strikethrough = false;
    form.reset();
    newTask.appendChild(removeBtn);
    todoList.prepend(newTask);
    console.log(newTask.childNodes[0].textContent);
    console.log(removeBtn);
    savedFile.push({ task: newTask.childNodes[0].textContent, strikethrough: false});
    localStorage.setItem("tasks", JSON.stringify(savedFile));
    }
});