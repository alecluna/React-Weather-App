import React, { Component } from 'react';
import WeatherItem from './WeatherItem';

class Weather extends Component {
      render() {
        
        let weatherList;

        if (this.props.weather){ //if json weather exists...

            //console.log("SUCCESS"); //testing json api
            weatherList = this.props.weather.map(weather => {

                  console.log(weather);
                  return (

                        <WeatherItem key={weather.city} weather={weather}/>
                  );

            });
        }
        return (
          <div>
    
            {weatherList}
    
          </div>
        );
      }
    }
    
    
    
    
    export default Weather;
    