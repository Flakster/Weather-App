import moment from 'moment';
import {
  body, 
  drawMainBox,
  changeBackground
} from './components'

const render = async (data) =>{
  const objectData =  await data;
  console.log(objectData);
  console.log(`${objectData.name}, ${objectData.sys.country}`);
  console.log(`${objectData.main.temp} °F`);
  console.log(`${objectData.weather[0].description}`);
  const timeZone = objectData.timezone;
 
  const offsetInMinutes = timeZone / 60;
  const currTime = moment().utcOffset(offsetInMinutes).format("h:mm A");


  const hours = parseInt(moment().utcOffset(offsetInMinutes).format("HH"));

  console.log(`${currTime}`);
  console.log(`Hours: ${hours}`)

  if (hours < 6 || hours > 18){
    changeBackground('night');
    console.log('It\'s night time!');
   }else {
     changeBackground('day');
    console.log('It\'s day time!');
  }

}



export default render;