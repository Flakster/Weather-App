import render from "./renderData";
import askAPIFor from './apiData';
import imgHumidity from './../images/humidity.png'
import skyLine from './../images/skyline.png'
import { max } from "moment";

const body = document.getElementsByTagName('body')[0];
const container = document.getElementById('container');
const mainBox = document.createElement('div');
const background = new Image();
const title = document.createElement('div')
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
let currentTemp;
let minimumTemp;
let maximumTemp;

const drawMainBox = () =>{
  body.classList.add('day');
  background.src = skyLine;
  mainBox.style.background = `url('${skyLine.slice(4,skyLine.length)}') top/cover no-repeat`;
  mainBox.classList.add('mainBox','border','border-white','mx-auto','my-4', 'rounded', 'text-white','d-flex','flex-column');
  container.appendChild(mainBox);
  const cityLabel = document.createElement('div');

  title.classList.add('title','text-center');
  title.innerHTML='Weather app'

  textBoxArea.classList.add('d-flex', 'flex-row', 'justify-content-center','align-items-center');

  cityInput.classList.add('w-50')
  cityInput.addEventListener('keypress', function(e){
    if (e.keyCode !== 13){
      return false;
    }
    render(askAPIFor(this.value));
    
  });
  
  weatherBox.classList.add('weatherBox', 'd-flex', 'flex-row','pt-5');

  cityLabel.classList.add('my-3', 'mr-3')
  cityLabel.innerHTML= 'City';

  cityBox.classList.add('cityBox');
  iconBox.classList.add('iconBox');
  iconBox.setAttribute('id','iconBox');
  temperatureBox.classList.add('temperatureBox');

  
  textBoxArea.appendChild(cityLabel);
  textBoxArea.appendChild(cityInput);

  weatherBox.appendChild(cityBox);  
  weatherBox.appendChild(iconBox);  
  weatherBox.appendChild(temperatureBox);  
    
  mainBox.appendChild(title);
  mainBox.appendChild(textBoxArea);
  
  mainBox.appendChild(weatherBox);
}

const changeBackground = (time) => {
  if (time === 'night'){
    if(body.classList.contains('day')){
      body.classList.remove('day');
    }
    body.classList.add('night');
  }else{
    if(body.classList.contains('night')){
      body.classList.remove('night');
    }
    body.classList.add('day');
  }
}

const fillCityBox = (city, country, hour, message, humidity) =>{
  while (cityBox.firstChild){
    cityBox.removeChild(cityBox.firstChild);
  }
  const place = document.createElement('div');
  const time = document.createElement('div');
  time.classList.add('medium-text', 'pl-lg-5', 'pl-3');
  const msg = document.createElement('div');
  const humidityBox = document.createElement('div');
  humidityBox.classList.add('d-flex', 'flex-row', 'align-items-center');
  const humidityIcon = new Image();
  humidityIcon.src = imgHumidity.slice(4,imgHumidity.length);
  humidityIcon.classList.add('mx-lg-5','mx-3')
  const humidityValue = document.createElement('div');
  humidityValue.innerHTML = `${humidity} %`;
  humidityValue.classList.add('medium-text', 'my-10');
  humidityBox.appendChild(humidityIcon);
  humidityBox.appendChild(humidityValue);
  msg.classList.add('medium-text', 'pl-lg-5', 'pl-3');
  place.innerHTML = `${city}, ${country}`;
  place.classList.add('large-text', 'pl-lg-5','pl-3' );
  time.innerHTML = hour;
  msg.innerHTML = message; 
  cityBox.appendChild(place);
  cityBox.appendChild(time);
  cityBox.appendChild(msg);
  cityBox.appendChild(humidityBox);
}

const fillIconBox = (icon) =>{
  const url = `http://openweathermap.org/img/w/${icon}.png`
  const box = document.getElementById('iconBox');
  box.style.background = `url("${url}") top/cover no-repeat`;

}

const fillTemperatureBox = (temp,tMin,tMax) =>{
  while(temperatureBox.firstChild){
    temperatureBox.removeChild(temperatureBox.firstChild);
  }
  currentTemp = temp;
  minimumTemp = tMin;
  maximumTemp = tMax;

  if (metric){
    switchUnits(metric);
  }else{
    current.innerHTML=`${currentTemp} ${unit}`
    minMax.innerHTML = `Min. ${minimumTemp}${unit} <br>  Max. ${maximumTemp}${unit}`;
  }
  current.classList.add('large-text','pl-lg-4');
  minMax.classList.add('medium-text', 'pl-lg-4');

  temperatureBox.appendChild(current);
  temperatureBox.appendChild(minMax);


  switchBox.classList.add('mx-lg-5');

  celsius.innerHTML = '°C';
  fahrenheit.innerHTML = '°F'
  
  labelSwitch.classList.add('switch', 'mx-lg-2');

  inputSwitch.setAttribute('type','checkbox');
  metric = inputSwitch.checked
  console.log(`metric units: ${metric}`)

  spanSwitch.classList.add('slider', 'round')

  labelSwitch.appendChild(inputSwitch);
  labelSwitch.appendChild(spanSwitch);

  inputSwitch.addEventListener('change', function(e){
    metric = inputSwitch.checked;
    console.log(`cambiando a: ${metric}`);
    switchUnits(metric);
  });

  switchBox.appendChild(fahrenheit);
  switchBox.appendChild(labelSwitch);
  switchBox.appendChild(celsius);
  temperatureBox.appendChild(switchBox);
}

const switchUnits = (metric) =>{
  if (metric){
    currentTemp = Math.round((currentTemp - 32)*5/9);
    minimumTemp = Math.round((minimumTemp - 32)*5/9);
    maximumTemp = Math.round((maximumTemp - 32)*5/9);
    unit = '°C'
  }else{
    currentTemp = Math.round(currentTemp*5/9 + 32);
    minimumTemp = Math.round(minimumTemp*5/9 + 32);
    maximumTemp = Math.round(maximumTemp*5/9 + 32);
    unit = '°F'
  }
  current.innerHTML=`${currentTemp} ${unit}`
  minMax.innerHTML = `Min. ${minimumTemp}${unit} <br>  Max. ${maximumTemp}${unit}`;
}

export {
  body, 
  drawMainBox,
  changeBackground,
  fillCityBox,
  fillIconBox,
  fillTemperatureBox
} 