const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = []; // todo가 입력될 때마다 array에 넣어서 localStorage에 저장하기 위한 array를 만든다. (6) 업데이트 가능하도록 let을 사용

function saveToDos(){
    // localStorage.setItem(TODOS_KEY, toDos); // 입력된 todo가 들어가있는 toDos array를 localStorage에 TODOS_KEY("todos") Key로 저장한다. (하지만 텍스트의 형태로 저장됨 [a, b, c, d] array 형태 : ["a", "b", "c", "d"]) (8)
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // ㄴ 그래서 JSON.stringify를 통해 string의 형태로 바꿔서 array에 넣어준다. (array의 형태로 저장됨 ["a", "b", "c"]) (9)
}

function deleteToDo(event){
    // console.log(event.target.parentElement); // 버튼이 클릭됐을 때 부모요소(li)의 text를 보여줌으로써 여러개의 버튼 중 어느 것이 클릭되었는지 알려줌
    const li = event.target.parentElement;
    li.remove(); // 버튼이 클릭됐을 때 그 버튼이 속한 부모요소 li 전체를 삭제한다. (5)
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // 클릭된 버튼이 속한 li와 id가 같은 것을 제외한, filter를 거친 나머지 것들로 toDos array를 업데이트한다. (parseInt : string(li.id)을 숫자로 바꿔준다) (18)
    saveToDos(); // 클릭한 todo가 제거된 상태를 localStorage에 저장한다. (19)
}

function paintToDo(newTodo){
    const makeList = document.createElement("li");
    makeList.id = newTodo.id; // li가 newTodoObj(todo를 만들면서 부여된 고유의) id를 가지게 한다. (17)
    const makeSpan = document.createElement("span");
    makeSpan.innerText = newTodo.text; // newTodo만 받아오면 [object Object]라고 뜨기 때문에 .text를 붙여서 newTodoObj 속의 text를 뜨게 해준다. (16)
    const makeButton = document.createElement("button");
    makeButton.innerText = "❌";
    makeButton.addEventListener("click", deleteToDo); // 만들어진 버튼을 클릭하면 deleteToDo 이벤트가 발생하게 한다. (4)
    makeList.appendChild(makeSpan);
    makeList.appendChild(makeButton);
    // html에 li와 span, button을 만들고 span과 button을 li 안에 집어넣는다. span 내부 텍스트에는 (1)에서 저장된 toDoInput의 value를 불러온다. (2)
    toDoList.appendChild(makeList); // (2)에서 만든 li를 toDoList ul에 넣어준다. (3)
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value; // toDoInput의 value를 비워버리기 전에 그 값을 newToDo에다 저장해둔다. (1)
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }; // todo가 추가될 때 각자 고유의 id를 가지고 array에 들어가게 한다.(13)
    toDos.push(newTodoObj); // newTodo를 toDos array 안에 밀어넣는다. (7) -> newTodoObj를 toDos array 안에 밀어넣는다. (14)
    paintToDo(newTodoObj); // paintToDo에 newTodo말고 newTodoObj를 넣어준다.(그러면 text가 아니라서 이상하게 뜸) (15)
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos); // localStorage에 저장된 toDos array(string 형태로 저장되어 있음)을 array로 바꿔준다. (JSON.parse() : string을 array로 바꿔준다) (10)
    toDos = parsedToDos; // 기존에 localStorage에 있던 item들이 새로고침을 하고 새로운 todo를 입력해도 계속 toDos array 안에 존재하게 한다. (12)
    parsedToDos.forEach(paintToDo); // array가 된 각각의 localStorage 속 item에 paintToDo function을 실행시켜 화면에 나타나게 한다. (forEach : 각각의 item 마다 function을 실행시켜준다) (11)
}
