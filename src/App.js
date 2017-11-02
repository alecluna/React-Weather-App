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

   this.search()
   
  }

  componentDidMount() {
    //called after component has been rendered into the page
  }

  componentWillReceiveProps() {
    //called when the props provided to the component are changed
  }

  updateSearch() {
    this.search(this.refs.query.value);
  }

  render() { //use lodash for on map() for better persformance
    //const number = [1,2,3,4,5];
    let weather;
    if (this.state.condition) {
      weather = _.map(this.state.condition, (passedInWeather, index) => {

        return <li key={index}> {passedInWeather} </li>;
      });
    }
    return (
      <div>
        Weather App
        <input ref="query" onChange={(e) => { this.updateSearch(e); }} type="text" />
        <div> {weather} </div>
      </div>
    );
  }


  search(query = "Sacramento") {

    var searchText = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"${query}\")';
    var url = "https://query.yahooapis.com/v1/public/yql?q="+searchText+"&format=json";
    Request.get(url).then((response) => {
      this.setState({
        condition: response.body.query.results.channel.item.condition
      });
      console.log(response.body.query.results);      
      console.log(response.body.query.results.channel.item.condition);
    });

  }
}

export default App;
