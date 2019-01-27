import React, { Component } from "react";
import TextField from "../node_modules/@material-ui/core/TextField";
import Typography from "../node_modules/@material-ui/core/Typography";
import List from "../node_modules/@material-ui/core/List";
import Button from "../node_modules/@material-ui/core/Button";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      condition: {},
      forecast: [],
      wind: {},
      city: ""
    };
  }

  componentDidMount() {
    this.search();
  }

  search = (query = `sacramento`) => {
    let searchText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${query}")`;
    let url = `https://query.yahooapis.com/v1/public/yql?q=${searchText}&format=json`;

    if (url) {
      fetch(url)
        .then(response => {
          this.setState({
            condition: response.body.query.results.channel.item.condition,
            city: response.body.query.results.channel.location.city,
            forecast: response.body.query.results.channel.item.forecast,
            wind: response.body.query.results.channel.wind
          });
        })
        .catch(error => {
          console.log(error + "error caught");
        });
    } else {
      console.log("Search query failed");
    }
  };

  _updateSearch = () => {
    this.search(this.refs.query.value);
  };

  _displayWeather = forecast => {
    return forecast.map((forecast, index) => {
      return (
        <li key={index.toString()}>
          For {forecast.day}: High:
          {forecast.high} - Low:
          {forecast.low}
        </li>
      );
    });
  };
  render() {
    const { condition, city, forecast, wind } = this.state;

    return (
      <div>
        {" "}
        <Typography variant="display1">Enter a City</Typography>
        <TextField
          label="Enter a City"
          margin="normal"
          onChange={this._updateSearch.bind(this)}
          value={city}
        />
        <Button variant="outlined" size="medium" color="primary">
          Continue
        </Button>
        <Typography variant="display3">Welcome, in {city} it is:</Typography>
        <List>
          <li>{condition.temp}</li>
          <li>{condition.text}</li>
        </List>
        <Typography> Current wind speeds: {wind.speed} </Typography>
        <Typography> Your 10 day forecast in {city} </Typography>
        <div> {this._displayWeather(forecast)}</div>
      </div>
    );
  }
}
