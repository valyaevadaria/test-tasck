import React from 'react'
import getCountry from './geo/country';

const getDirection = deg => {
  if (deg === 0 || deg === 360) {
    return 'C';
  } else if (deg > 0 && deg < 90) {
    return 'СВ';
  } else if (deg === 90) {
    return 'В';
  } else if (deg > 90 && deg < 180) {
    return 'ЮВ';
  } else if (deg === 180) {
    return 'Ю';
  } else if (deg > 180 && deg < 270) {
    return 'ЮЗ';
  } else if (deg === 270) {
    return 'З';
  }
  return 'СЗ';
}

const Weather = props => {
  const src = `http://openweathermap.org/img/w/${props.weather.icon}.png`;
  
  return (
    <div>
      { props.city &&
      <div>
        <h4>{props.city}</h4> 
        <p>{getCountry(props.country)}</p>
        <img src={src} alt='Weather icon'></img>
        <p>{props.weather.description}</p>
        <p>{Math.round(props.temp / 10)}&deg;</p>
        <p>{props.humidity} %</p>
        <p>{props.wind.speed} м/с {getDirection(props.wind.deg)}</p>
      </div>
      }
    </div>
  );
}

export default Weather