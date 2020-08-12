import render from "./renderData";
import askAPIFor from './apiData';


const body = document.getElementsByTagName('body')[0];
const container = document.getElementById('container');
const mainBox = document.createElement('div');
const title = document.createElement('div')
const textBoxArea = document.createElement('div');
const cityInput = document.createElement('input');
const weatherBox = document.createElement('div');
const cityBox = document.createElement('div');
const iconBox = document.createElement('div');
const temperatureBox = document.createElement('div');
const switchBox = document.createElement('div');

const drawMainBox = () =>{
  body.classList.add('day');

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

  switchBox.classList.add('text-center', 'bg-info');
  switchBox.innerHTML='here';
  mainBox.appendChild(switchBox);
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

const fillCityBox = (city, country, hour, message) =>{
  while (cityBox.firstChild){
    cityBox.removeChild(cityBox.firstChild);
  }
  const place = document.createElement('div');
  const time = document.createElement('div');
  time.classList.add('medium-text', 'pl-5')
  const msg = document.createElement('message');
  msg.classList.add('medium-text', 'pl-5')
  place.innerHTML = `${city}, ${country}`;
  place.classList.add('display-4','pl-5' );
  time.innerHTML = hour;
  msg.innerHTML = message; 
  cityBox.appendChild(place);
  cityBox.appendChild(time);
  cityBox.appendChild(msg);
}

const fillIconBox = (icon) =>{
  const url = `http://openweathermap.org/img/w/${icon}.png`
  const box = document.getElementById('iconBox');
  box.style.background = `url("${url}") top/cover no-repeat`;

}

const fillTemperatureBox = (temp,tmin,tmax) =>{
  while(temperatureBox.firstChild){
    temperatureBox.removeChild(temperatureBox.firstChild);
  }
  const current = document.createElement('div');
  current.classList.add('display-4','pl-4');
  current.innerHTML=`${temp} °F`
  const minMax = document.createElement('div');
  minMax.classList.add('medium-text', 'pl-4');
  minMax.innerHTML = `Min. ${tmin}°F   Max.${tmax}°F`;
  temperatureBox.appendChild(current);
  temperatureBox.appendChild(minMax);
}

export {
  body, 
  drawMainBox,
  changeBackground,
  fillCityBox,
  fillIconBox,
  fillTemperatureBox
} 