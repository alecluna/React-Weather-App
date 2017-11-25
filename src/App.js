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

  search(query = "los angeles") {

    var searchText = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + query + '")';
    var url = "https://query.yahooapis.com/v1/public/yql?q=" + searchText + "&format=json";

    if (url != null) {
<<<<<<< HEAD
      Request.get(url).then((response) => { //chain promise, call api and catch error 
=======
      Request.get(url).then((response) => {
>>>>>>> origin/master
        this.setState({
          condition: response.body.query.results.channel.item.condition,
          city: response.body.query.results.channel.location.city
        });
        console.log(response.body.query);
        console.log(response.body.query.results);
        console.log(response.body.query.results.channel.location.city);
<<<<<<< HEAD
      }, reason => { 
        console.log(reason + " --- reason was hit")
      }).catch((error) =>{ //added catch statement for better error handling 

        console.log(error + "error caught")

      }); //now no errors get thrown while searching api >:)
    }
=======
      }, reason => { console.log("api fucked up")});
    }

>>>>>>> origin/master
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

  render() { //use lodash on map() for better persformance
    //const number = [1,2,3,4,5];
    let weather;
    let condition = this.state.condition;
    if (condition) {
      //i actually have no idea why lodash works :/
      weather = _.map(condition, (passedInWeather, index) => {
        return <li key={index}> {passedInWeather} </li>;
      });
    }
    return (
      <div>
        Weather App
        <input ref="query" onChange={(e) => { this.updateSearch(); }} type="text" />
        <div>
<<<<<<< HEAD
          
=======
>>>>>>> origin/master
          {weather}
        </div>
      </div>
    );
  }

}

export default App;
