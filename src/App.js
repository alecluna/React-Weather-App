import React, { Component } from "react";
import TextField from "../node_modules/@material-ui/core/TextField";
import CardContent from "../node_modules/@material-ui/core/CardContent";
import Typography from "../node_modules/@material-ui/core/Typography";
import List from "../node_modules/@material-ui/core/List";

import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Button from "../node_modules/@material-ui/core/Button";

const styles = {
  titleStyle: {
    fontSize: "30",
    fontWeight: "200"
  },
  forecastStyle: {
    listStyleType: "none"
  }
};

class App extends Component {
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

  search(query) {
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
  }

  _updateSearch() {
    this.search(this.refs.query.value);
  }

  render() {
    const { condition, city, forecast, wind } = this.state;
    let cityForecast = forecast.map((forecast, index) => {
      return (
        <li key={index.toString()}>
          For {forecast.day}: High:
          {forecast.high} - Low:
          {forecast.low}
        </li>
      );
    });

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="display1" style={styles.titleStyle}>
            Enter a City
          </Typography>

          <TextField
            label="Enter a City"
            margin="normal"
            onChange={this._updateSearch.bind(this)}
            value={city}
          />
        </div>
        <Button variant="outlined" size="medium" color="primary">
          Continue
        </Button>
        <Paper>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <CardMedia image="/Users/alecluna/Documents/react-weather-appV2/sunny.png" />
            <CardContent>
              <Typography variant="display3" style={styles.titleStyle}>
                Welcome, in {city} it is:
              </Typography>
              <List>
                <li>{condition.temp}</li>
                <li>{condition.text}</li>
              </List>
              <Typography> Current wind speeds: {wind.speed} </Typography>
              <Typography> Your 10 day forecast in {city} </Typography>
              <div style={styles.forecastStyle}> {cityForecast} </div>
            </CardContent>
          </div>
        </Paper>
        <div />
      </div>
    );
  }
}

export default App;
