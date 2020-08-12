import render from "./renderData";
import askAPIFor from './apiData';


const body = document.getElementsByTagName('body')[0];
const container = document.getElementById('container');
const mainBox = document.createElement('div');
const title = document.createElement('div')
const textBoxArea = document.createElement('div');
const cityInput = document.createElement('input');
const weatherBox = document.createElement('div')

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

  cityLabel.classList.add('my-3', 'mr-3')
  cityLabel.innerHTML= 'City';

  weatherBox.classList.add('weatherBox');
  
  textBoxArea.appendChild(cityLabel);
  textBoxArea.appendChild(cityInput);

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


export {
  body, 
  drawMainBox,
  changeBackground
} 