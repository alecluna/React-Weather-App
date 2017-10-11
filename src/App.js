import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';
//import Weather from './Components/Weather';
//import WeatherFind from './Components/WeatherFind'


class App extends Component {

  constructor() {
    super();
    this.state = {};

  }

  componentWillMount() {

    this.setState({
      weather: [ //api call goes here

        { city: 'Sacramento', temp: '47', rain: false },
        { city: 'Rocklin', temp: '86', rain: false },
        { city: 'Roseville', temp: '68', rain: true }

      ]
    });

  }

  componentDidMount(){
    //called after component has been rendered into the page
  }

  componentWillReceiveProps(){
    //called when the props provided to the component are changed
  }

  updateSearch(e) {
      //a weather handler
  }

  render() { //use lodash for on map() for better persformance
      let weather = _.map(this.state.weather, (passedInWeather) => {
            return <li>{passedInWeather.city} - {passedInWeather.temp} Deg</li>;
      });
    return (
      <div>
        Weather App 
        <input ref="query" onChange={ (e) => {this.updateSearch(e);} } type="text"/>
        <ul> {weather} </ul>
        </div>
    );
  }
}




export default App;
