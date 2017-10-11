import React, { Component } from 'react';
import Weather from './Components/Weather';
import WeatherFind from './Components/WeatherFind'


class App extends Component {

  constructor() {
    super();
      // this.state = {

      //   weather: [

      //     { city: '' }
      //     // { city: 'Rocklin', temp: '86', rain: 'no' },
      //     // { city: 'Roseville', temp: '68', rain: 'no' }

      //   ]};
    }
  
    ComponentWillMount() { 

      this.setState({
        weather: [

          // { city: 'Sacramento', temp: '47', rain: false },
          // { city: 'Rocklin', temp: '86', rain: false },
          // { city: 'Roseville', temp: '68', rain: true }

        ]
      });

    }

    handleAddWeather(weather){
      console.log(weather)
      // let newWeather = this.state.weather; 
      // weather.push(newWeather);
      // this.setState({weather});
      this.setState({weather});
      this.state.weather.map(weather => { console.log("current state" + weather)  }); //this breaks app
    }

    render() {

      return (
        <div>
          Weather App
          <WeatherFind addWeather={this.handleAddWeather.bind(this)} />
          <Weather weather={this.weather} />
        </div>
      );
    }
  }




  export default App;
