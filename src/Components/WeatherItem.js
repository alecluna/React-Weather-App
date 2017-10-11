import React, { Component } from 'react';

class WeatherItem extends Component {
      render() {

        // console.log(this.props.weather.city);
        // console.log(this.props.weather.temp);
        
        return (
          <li className="weatherItem">
                {this.props.weather.city} - {this.props.weather.temp} - {this.props.weather.rain}
          </li>
        );
      }
    }
 
    export default WeatherItem;
    