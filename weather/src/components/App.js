import React, {Component} from 'react'
import Info from './Info'
import Form from './Form'
import Weather from './Weather'

const API_KEY = 'f89ea20422410746e11204dc1ac135dc';

class App extends Component {
  
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    
    
    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
    
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      });
    } else {
      this.setState({
        error: 'Город введён не верно',
      });
    }
  }  

  render() {
    return (
      <div>
        <Info />
        <Form weather={this.getWeather} />
        <Weather
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App
