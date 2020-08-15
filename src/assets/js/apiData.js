/* eslint-disable no-alert */
const askAPIFor = async (place) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&APPID=d67922c7514dc6d0e2d16efa21eee2f0`,
      { mode: 'cors' },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
  return false;
};


export default askAPIFor;