const weatherForm = document.querySelector(".weather-form");
const address = document.querySelector(".address");

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const addressValue = address.value;
    const resultElem = document.querySelector(".result");
    const errorElem = document.querySelector(".error");
    const locationElem = document.querySelector(".location");
    resultElem.textContent = "Loading..";
    errorElem.textContent = "";
    locationElem.textContent = "";
    fetch('/weather?address=' + encodeURIComponent(addressValue)).then((response) => {
        resultElem.textContent = "";
        response.json().then((data) => {
            if (data.error) {
                const errorMessage = data.error;
                errorElem.textContent = errorMessage;
            } else {
                const { forecast, location } = data;
                resultElem.textContent = "Forecast: " + forecast;
                locationElem.textContent = "Location: " + location;
            }
        });
    });
})