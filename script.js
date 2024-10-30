const API_KEY = 'A5LDTYLDBLPW7JLH62TKCFQYY';

const highTemp = document.querySelector('.high-temp');
const lowTemp = document.querySelector('.low-temp');

async function getData() {
    try {
        const locationInput = document.querySelector('#location').value;
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}?key=${API_KEY}`,
            { mode: 'cors' }
        );
        const data = await response.json();
        const newData = processData(data);
        highTemp.textContent = `High: ${newData.high}`;
        lowTemp.textContent = `Low: ${newData.low}`;
        img = document.querySelector('.pic');
        if (newData.high > 60) {
            img.src = 'images/cool.png';
        } else {
            img.src = 'images/cold.png';
        }
    } catch (err) {
        console.log(err);
    }
}

const btn = document.querySelector('button');
btn.addEventListener('click', getData);

function processData(data) {
    const maxTemp = data.days[0].tempmax;
    const minTemp = data.days[0].tempmin;
    return {
        high: maxTemp,
        low: minTemp,
    };
}
