import React, { Component } from 'react';
import Request from 'superagent';

class App extends Component {

  constructor() {
    super();
    this.state = {
      condition: {},
      forecast: [],
      wind: {},
      city: ''
    };
    this.updateSearch = this.updateSearch.bind(this); //assigning to use late and pass down 'state' to child components
  }

  componentDidMount() {
    /*
    Using componentDidMount makes it clear that data won’t be loaded until after the initial render.
    */
    this.search()
  }

  search(query = "los angeles") {
    // debugger; add this to debug in dev tools
    var searchText = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + query + '")';
    var url = "https://query.yahooapis.com/v1/public/yql?q=" + searchText + "&format=json";

    if (url != null) {
      Request.get(url).then((response) => { //chain promise, call api and catch error 
        this.setState({
          condition: response.body.query.results.channel.item.condition,
          city: response.body.query.results.channel.location.city,
          forecast: response.body.query.results.channel.item.forecast,
          wind: response.body.query.results.channel.wind
        });
        console.log(response.body.query);
        console.log(response.body.query.results.channel.item.forecast);
        console.log(response.body.query.results.channel.wind);
        console.log(this.state.city);
        console.log(response.body.query.results.channel);

      }, reason => {
        console.log(reason + " --- reason was hit")
      }).catch((error) => { //added catch statement for better error handling 

        console.log(error + "error caught")

      }); //now no errors get thrown while searching api >:)

    }
  }
  componentWillReceiveProps() {
    //called when the props provided to the component are changed
  }

  updateSearch() {
    this.search(this.refs.query.value);
  }

  render() { //use lodash on map() for better persformance
    //const number = [1,2,3,4,5];
    const titleStyle = {
      fontSize: '30',
      fontWeight: '200',
    }

    const forecastStyle = {

      listStyleType: 'none'
    }

    let condition = this.state.condition;
    let city, forecast, wind, cityForecast;
    if (condition) {

      city = this.state.city
      forecast = this.state.forecast;
      wind = this.state.wind;
      console.log(wind);
      //map through forecast
      cityForecast = this.state.forecast.map((forecast, index) => {
        return <li key={index.toString()}> For {forecast.day}: High:{forecast.high} - Low:{forecast.low} </li>
      });
  
    }

    return (
      <div>
        <p style={titleStyle}> Enter a City </p>
        <input ref="query" onChange={this.updateSearch} type="text" />
        <div>
          <p> Welcome, in {city}, it is: </p>
          <ul>
            <li>{condition.date}</li>
            <li>{condition.temp}</li>
            <li>{condition.text}</li>
          </ul>
        </div>
        <div>
          <p> Wind Chill feels like {wind.chill}, in {city} </p>
          <p> Current wind speeds: {wind.speed} </p>
          <p> Your 10 day forecast in {city}  </p>
          <div style={forecastStyle}> {cityForecast} </div>

        </div>
      </div>
    );
  }

}

export default App;
