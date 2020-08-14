/* eslint-disable import/no-cycle, no-unused-vars */
import { max } from 'moment';
import render from './renderData';
import askAPIFor from './apiData';
import imgHumidity from '../images/humidity.png';
import skyLine from '../images/skyline.png';
import location from '../images/location.png';

const body = document.getElementsByTagName('body')[0];
const container = document.getElementById('container');
const mainBox = document.createElement('div');
const footer = document.createElement('footer');
const background = new Image();
const title = document.createElement('h1');
const textBoxArea = document.createElement('div');
const cityInput = document.createElement('input');
const weatherBox = document.createElement('div');
const cityBox = document.createElement('div');
const iconBox = document.createElement('div');
const temperatureBox = document.createElement('div');
const current = document.createElement('div');
const minMax = document.createElement('div');
const switchBox = document.createElement('div');
const labelSwitch = document.createElement('label');
const inputSwitch = document.createElement('input');
const spanSwitch = document.createElement('span');
const celsius = document.createElement('span');
const fahrenheit = document.createElement('span');
let metric = false;
let unit = '°F';

const tempCelsius = {
  current: 0,
  min: 0,
  max: 0,
};

const tempFahrenheit = {
  current: 0,
  min: 0,
  max: 0,
};

const drawMainBox = () => {
  body.classList.add('day');
  background.src = skyLine;
  mainBox.style.background = `url('${skyLine.slice(4, skyLine.length)}') top/cover no-repeat`;
  mainBox.classList.add('mainBox', 'border', 'border-white', 'mx-auto', 'my-4', 'rounded', 'text-white', 'd-flex', 'flex-column');
  const cityLabel = document.createElement('div');

  title.classList.add('title', 'text-center');
  title.innerHTML = 'Weather app';

  textBoxArea.classList.add('d-flex', 'flex-row', 'justify-content-center', 'align-items-center');

  cityInput.classList.add('w-50');

  cityInput.addEventListener('keypress', function func(e) {
    if (e.keyCode === 13) {
      render(askAPIFor(this.value));
    }
    return false;
  });

  weatherBox.classList.add('weatherBox', 'd-flex', 'flex-row', 'pt-5');

  cityLabel.classList.add('my-3', 'mr-3');
  cityLabel.innerHTML = 'City';

  cityBox.classList.add('cityBox');
  iconBox.classList.add('iconBox');
  iconBox.setAttribute('id', 'iconBox');
  temperatureBox.classList.add('temperatureBox');

  footer.classList.add('text-center', 'text-white', 'footer');
  footer.innerHTML = '© 2020 <a href=\'https://www.carlossantamaria.co\' target=\'_blank\'>Carlos Santamaría</a>';

  textBoxArea.appendChild(cityLabel);
  textBoxArea.appendChild(cityInput);

  weatherBox.appendChild(cityBox);
  weatherBox.appendChild(iconBox);
  weatherBox.appendChild(temperatureBox);

  mainBox.appendChild(title);
  mainBox.appendChild(textBoxArea);
  mainBox.appendChild(weatherBox);

  container.appendChild(mainBox);
  container.appendChild(footer);
};

const changeBackground = (time) => {
  if (time === 'night') {
    if (body.classList.contains('day')) {
      body.classList.remove('day');
    }
    body.classList.add('night');
  } else {
    if (body.classList.contains('night')) {
      body.classList.remove('night');
    }
    body.classList.add('day');
  }
};

const fillCityBox = (city, country, hour, message, humidity, linkMap) => {
  while (cityBox.firstChild) {
    cityBox.removeChild(cityBox.firstChild);
  }
  const place = document.createElement('div');
  const map = location.slice(4, location.length);
  const time = document.createElement('div');
  time.classList.add('medium-text', 'pl-lg-5', 'pl-3');
  const msg = document.createElement('div');
  const humidityBox = document.createElement('div');
  humidityBox.classList.add('d-flex', 'flex-row', 'align-items-center');
  const humidityIcon = new Image();
  humidityIcon.src = imgHumidity.slice(4, imgHumidity.length);
  humidityIcon.classList.add('mx-lg-5', 'mx-3');
  const humidityValue = document.createElement('div');
  humidityValue.innerHTML = `${humidity} %`;
  humidityValue.classList.add('medium-text', 'my-10');
  humidityBox.appendChild(humidityIcon);
  humidityBox.appendChild(humidityValue);
  msg.classList.add('medium-text', 'pl-lg-5', 'pl-3');
  place.innerHTML = `${city}, ${country} <a href='${linkMap}' target='_blank'><img src=${map}></a>`;
  place.classList.add('large-text', 'pl-lg-5', 'pl-3');
  time.innerHTML = hour;
  msg.innerHTML = message;
  cityBox.appendChild(place);
  cityBox.appendChild(time);
  cityBox.appendChild(msg);
  cityBox.appendChild(humidityBox);
};

const fillIconBox = (icon) => {
  const url = `http://openweathermap.org/img/w/${icon}.png`;
  const box = document.getElementById('iconBox');
  box.style.background = `url("${url}") center/cover no-repeat`;
};

const switchUnits = (metric) => {
  if (metric) {
    unit = '°C';
    current.innerHTML = `${tempCelsius.current} ${unit}`;
    minMax.innerHTML = `Min. ${tempCelsius.min}${unit} <br>  Max. ${tempCelsius.max}${unit}`;
  } else {
    unit = '°F';
    current.innerHTML = `${tempFahrenheit.current} ${unit}`;
    minMax.innerHTML = `Min. ${tempFahrenheit.min}${unit} <br>  Max. ${tempFahrenheit.max}${unit}`;
  }
};

const fillTemperatureBox = (temp, tMin, tMax) => {
  while (temperatureBox.firstChild) {
    temperatureBox.removeChild(temperatureBox.firstChild);
  }
  tempFahrenheit.current = temp;
  tempFahrenheit.min = tMin;
  tempFahrenheit.max = tMax;
  tempCelsius.current = Math.round(((temp - 32) * 5) / 9);
  tempCelsius.min = Math.round(((tMin - 32) * 5) / 9);
  tempCelsius.max = Math.round(((tMax - 32) * 5) / 9);
  if (metric) {
    switchUnits(metric);
  } else {
    current.innerHTML = `${temp} ${unit}`;
    minMax.innerHTML = `Min. ${tMin}${unit} <br>  Max. ${tMax}${unit}`;
  }
  current.classList.add('large-text', 'pl-lg-4');
  minMax.classList.add('medium-text', 'pl-lg-4');

  temperatureBox.appendChild(current);
  temperatureBox.appendChild(minMax);

  switchBox.classList.add('mx-lg-4');

  celsius.innerHTML = '°C';
  fahrenheit.innerHTML = '°F';

  labelSwitch.classList.add('switch', 'mx-lg-2');

  inputSwitch.setAttribute('type', 'checkbox');
  metric = inputSwitch.checked;

  spanSwitch.classList.add('slider', 'round');

  labelSwitch.appendChild(inputSwitch);
  labelSwitch.appendChild(spanSwitch);

  inputSwitch.addEventListener('change', () => {
    metric = inputSwitch.checked;
    switchUnits(metric);
  });

  switchBox.appendChild(fahrenheit);
  switchBox.appendChild(labelSwitch);
  switchBox.appendChild(celsius);
  temperatureBox.appendChild(switchBox);
};

export {
  body,
  drawMainBox,
  changeBackground,
  fillCityBox,
  fillIconBox,
  fillTemperatureBox,
};