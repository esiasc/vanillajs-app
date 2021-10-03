const loginForm = document.querySelector("#login-div");
const loginInput = document.querySelector("#login-div input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASS = "hidden";
const USERNAME_KEY = "username";

const clock = document.querySelector("#clock-div");
const todoDiv = document.querySelector("#todo-div");
const weatherDiv = document.querySelector("#weather-div");

function onLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASS);
    const username = loginInput.value
    localStorage.setItem(USERNAME_KEY, username);
    showGreeting(username);
}
function showGreeting(username){
    greeting.classList.remove(HIDDEN_CLASS);
    clock.classList.remove(HIDDEN_CLASS);
    todoDiv.classList.remove(HIDDEN_CLASS);
    weatherDiv.classList.remove(HIDDEN_CLASS);
    greeting.innerText = `Hello, ${username}`;
}
/*
function getClock (){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}
*/
const savedName = localStorage.getItem(USERNAME_KEY);

if(savedName === null){
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit", onLoginSubmit);
} else{
    showGreeting(savedName);
}
/*
getClock();
setInterval(getClock, 1000);
*/