import React from 'react'

const getTime = second => {
  const date = new Date();
  date.setTime(second);
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return time;
}

const Weather = props => {
  if (props.error) {
    return (
      <div>
        {props.error}
      </div>
    );
  }
  return (
    <div>
      { props.city &&
        <div>
          <p>Место: {props.city}, {props.country}</p>
          <p>t, c днём: {Math.round(props.temp)}, c</p>
          <p>t, c ночью: {Math.round(props.temp)}, c</p>
          <p>Icon</p>
          <p>Дата: {getTime(props.sunrise)}</p>
          <p>День недели:</p>
        </div>
      }
    </div>
  );
}

export default Weather