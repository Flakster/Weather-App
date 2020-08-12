import moment from 'moment';
import {
  body, 
  drawMainBox,
  changeBackground,
  fillCityBox,
  fillIconBox,
  fillTemperatureBox
} from './components'

const render = async (data) =>{
  const objectData =  await data;
  console.log(objectData);
  const city = objectData.name;
  const country = objectData.sys.country;
  const temp = Math.round(objectData.main.temp);
  const tempMax = Math.round(objectData.main.temp_max);
  const tempMin = Math.round(objectData.main.temp_min);
  const humidity = objectData.main.humidity;
  const message = objectData.weather[0].description;
  const icon= objectData.weather[0].icon;
  const timeZone = objectData.timezone;
 
  const offsetInMinutes = timeZone / 60;
  const currTime = moment().utcOffset(offsetInMinutes).format("h:mm A");
  const hours = parseInt(moment().utcOffset(offsetInMinutes).format("HH"));

  if (hours < 6 || hours > 18){
    changeBackground('night');
   }else {
     changeBackground('day');
  }

  fillCityBox(city, country, currTime, message, humidity );
  fillIconBox(icon);
  fillTemperatureBox(temp, tempMin, tempMax);
}



export default render;