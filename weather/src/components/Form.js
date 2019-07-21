import React, {Component} from 'react'

class Form extends Component {
  render() {
    return (
      <form onSubmit={this.props.weather}>
        <p>Введите название города</p>
        <input type="text" name="city" placeholder="Город"></input>
        <button>Добавить</button>
      </form>
    );
  }
}

export default Form