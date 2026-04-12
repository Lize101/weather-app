// Variables
const weather = document.getElementById('weather');
const err = document.getElementById('error');
const header = document.getElementById('header');
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=London&days=7`;

//Fetch and return API data
let fetchWeather = async () => {
    let data = await fetch(apiUrl);
    let result = await data.json();
    return result
}

//Create and append cards for each day and display API data
let displayWeather = (result) => {
    const locationName = document.createElement('h2');
    locationName.textContent = result.location.name;

    header.appendChild(locationName);

    result.forecast.forecastday.forEach(day => {

        const div = document.createElement('div');
        div.className = 'card';

        const para0 = document.createElement('p');
        para0.className = 'paraDate';
        const dateObj = new Date(day.date);
        const formatDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            // year: 'numeric'
        })
        para0.textContent = formatDate;

        const img = document.createElement('img');
        img.src = day.day.condition.icon;
        img.alt = day.day.condition.text;

        const para1 = document.createElement('p');
        para1.textContent = 'Average temperature: ' + day.day.avgtemp_c;
    
        const para2 = document.createElement('p');
        para2.textContent = 'Max temperature: ' + day.day.maxtemp_c;

        const para3 = document.createElement('p');
        para3.textContent = 'Min temperature: ' + day.day.mintemp_c;

        const para4 = document.createElement('p');
        para4.textContent = 'Condition: ' + day.day.condition.text;

        div.appendChild(para0);
        div.appendChild(img);
        div.appendChild(para1);
        div.appendChild(para2);
        div.appendChild(para3);
        div.appendChild(para4);
        weather.appendChild(div);
    });

}

//Fetch weather data and display on page load
window.onload = async() => {
    try {
        const getData = await fetchWeather();
        displayWeather(getData);
        
    //Handling errors
    } catch(error){ 
        console.error(error);
        err.textContent = `There is an error: ${error}`;
    }
}