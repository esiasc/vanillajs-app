const API_KEY = "bc0fee35d3477223c24b0f443231b8ec";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const log = position.coords.longitude;
    console.log("You live in", lat, log);
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric` // 화씨를 섭씨로 바꾸기 위해 &units=metric 추가
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather-div span:first-child");
            const city = document.querySelector("#weather-div span:last-child");
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${Math.floor(data.main.temp)}℃`;
        }); // fetch를 이용해 url을 불러온다.
}

function onGeoError(){
    console.log("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);