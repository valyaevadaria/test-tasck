import React, {Component} from 'react'
import Info from './Info'
import Form from './Form'
import Weather from './Weather'

const API_KEY_WEATHER = 'f89ea20422410746e11204dc1ac135dc';
const API_KEY_TRNS = 'trnsl.1.1.20190722T151727Z.10b80402d19d49fd.2d83d86bc292a8aaad50640ef305c43b1163a312';
const API_KEY_USER = 'c5fa6f43f6a7510872c84111e540253e';

class App extends Component {

  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    weather: undefined,
    humidity: undefined,
    wind: undefined,
    error: undefined,
  }

  getUserCity = async () => {
    const userip = await fetch("https://api.ipify.org/?format=json");
    const user = await userip.json();
    const ipdata = await fetch (`http://api.ipstack.com/${user.ip}?access_key=${API_KEY_USER}`);
    const geodata = await ipdata.json();

    const api_weather_user = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${geodata.city}&appid=${API_KEY_WEATHER}&lang=ru`);
    const dataUser = await api_weather_user.json();

    this.setState({
      city: dataUser,
      country: dataUser.sys.country,
      temp: dataUser.main.temp,
      weather: dataUser.weather[0],
      humidity: dataUser.main.humidity,
      wind: dataUser.wind,
      error: undefined,
    });
  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    
    if(city) {
      const api_trns_url = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY_TRNS}&text=${city}&lang=ru-en`);
      const cityEng = await api_trns_url.json();
      const cityName = cityEng.text[0];
      const api_url_weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY_WEATHER}&lang=ru`);
      const data = await api_url_weather.json();
      
      if (data.cod === 200) {
        this.setState({
          city: city,
          country: data.sys.country,
          temp: data.main.temp,
          weather: data.weather[0],
          humidity: data.main.humidity,
          wind: data.wind,
          error: undefined,
        });
      } else {
        this.setState({
          error: 'Город введён не верно.',
        });
      }
    } else {
      this.setState({
        error: 'Введите название города.',
      });
    }
  }
  
  render() {
    return (
      <div>
        <Info />
        <Form weather={this.getWeather} />
        <p>{this.state.error}</p>
        { this.state.city &&
          <Weather
            city={this.state.city}
            country={this.state.country}
            temp={this.state.temp}
            weather={this.state.weather}
            humidity={this.state.humidity}
            wind={this.state.wind}
          />
        }
        
      </div>
    );
  }
}

export default App
