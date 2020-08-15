/* eslint-disable import/no-cycle, no-unused-vars */
import moment from 'moment';
import regeneratorRuntime from 'regenerator-runtime';
import {
  changeBackground,
  fillCityBox,
  fillIconBox,
  fillTemperatureBox,
} from './components';

const render = async (data) => {
  const objectData = await data;
  const city = objectData.name;
  const { country } = objectData.sys;
  const temp = Math.round(objectData.main.temp);
  const tempMax = Math.round(objectData.main.temp_max);
  const tempMin = Math.round(objectData.main.temp_min);
  const { humidity } = objectData.main;
  const message = objectData.weather[0].description;
  const { icon } = objectData.weather[0];
  const timeZone = objectData.timezone;
  const offsetInMinutes = timeZone / 60;
  const currTime = moment().utcOffset(offsetInMinutes).format('h:mm A');
  const hours = parseInt(moment().utcOffset(offsetInMinutes).format('HH'), 10);
  const mapLink = `https://www.google.com/maps/@?api=1&map_action=map&center=${objectData.coord.lat},${objectData.coord.lon}&zoom=12&basemap=terrain`;
  if (hours < 6 || hours > 18) {
    changeBackground('night');
  } else {
    changeBackground('day');
  }

  fillCityBox(city, country, currTime, message, humidity, mapLink);
  fillIconBox(icon);
  fillTemperatureBox(temp, tempMin, tempMax);
};


export default render;