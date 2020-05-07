const addInput = document.querySelector("#addTodo");
const addInputForm = document.querySelector(".form");
const filterTodo = document.querySelector("#filter");
const ulTodo = document.querySelector("ul");
const clearTodoButton = document.querySelector(".button");
const filterArea = document.querySelector(".filter-area");

const controlFunction = ()=> {
    if(localStorage.getItem("todos") === null || localStorage.getItem("todos") === "[]"){
        filterArea.style.display = "none";
        clearTodoButton.style.display = "none";
    }else{
       
    
        filterArea.style.display = "block";
        clearTodoButton.style.display = "inline-block";
        
    }
}



const filterTodos = () => {
    let filterValue = filterTodo.value;
    const li = document.querySelectorAll("li");
    li.forEach((e) => {
        if(e.textContent.search(filterValue)!== -1){
            e.style.display ="flex";
        }else{
            e.style.display="none";
        }
    })
    
}

const deleteAllTodo = () => {
   while(ulTodo.firstElementChild !== null){
       ulTodo.firstElementChild.remove();
   }

   localStorage.clear("todos")
   controlFunction();
}


const deleteItem = (e) => {
    
    
    if(e.target.className == "fas fa-times"){
        let todos = lsControl();
        e.target.parentElement.remove();
        let deleteItemIndex = todos.indexOf(e.target.parentElement.textContent);
        todos.splice(deleteItemIndex,1);
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    controlFunction();

    
}

const showAlert = (type,message) => {
    const alertDiv = document.createElement("div");
    alertDiv.className=`${type}`;
    alertDiv.textContent=`${message}`;
    addInputForm.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 1500);
}

const getTodos= () => {
    let todos = lsControl();
    todos.forEach(element => {
        addListItem(element);
    });
    controlFunction();
}

const lsControl = () => {
    let todos;

    if(localStorage.getItem("todos") === null) {
        todos =[];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}



const addLocalStorage = (value) => {
    let todos = lsControl();
    todos.push(value);
    localStorage.setItem("todos",JSON.stringify(todos));
}


const addListItem = (value) => {
    const li = document.createElement("li");
    li.innerHTML = `${value}<i class="fas fa-times"></i>`;

    ulTodo.appendChild(li);
    addInput.value="";
}


const addTodoToUI = (e) => {
    const addInputValue = addInput.value.trim();
    let todos = lsControl();
    let word =todos.find(function(word){
        if(word ===addInputValue){
            return word;
        }
    
        
    
    })

    if(addInputValue !== "" ){
            if(word == addInputValue){
                showAlert("danger","Aynı Tododan zaten mevcut");
            }else {
                addListItem(addInputValue);
         addLocalStorage(addInputValue);
        showAlert("success","Başarıyla Eklendi");
            }
         

    }
    else{
        showAlert("danger","Boş bırakmayın");
    }
    controlFunction();
    e.preventDefault();
}




(function(){
    addInputForm.addEventListener("submit",addTodoToUI);
    document.addEventListener("DOMContentLoaded",getTodos);
    ulTodo.addEventListener("click",deleteItem);
    clearTodoButton.addEventListener("click", deleteAllTodo);
    filterTodo.addEventListener("keyup", filterTodos);
})();