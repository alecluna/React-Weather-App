import React, { Component } from 'react';

class WeatherFind extends Component {

    constructor() {
        super();
        this.state = {}; //initialize blank state

    }

    handleSubmit(e) { //event handler for onSubmit()

        if (this.refs.city.value === "") { //if no input
            alert("city is required");
        }
        else {
            console.log(this.refs.city.value);
            this.setState({newWeather:{ //changing initial state with new city 

                city: this.refs.city.value
            }}, //callback function to lift up newly changed state
            function(){ 

                    this.props.addWeather(this.state.newWeather);
            });

        } //refs grab from attributes
        e.preventDefault();
    }

    render() {
        return ( 
            <div>
                <h3> Search your City </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <input type='text' ref='city' />
                        <input type='submit' value='submit' />
                    </div>

                </form>
            </div>
        ); //bind this to handleSubmit to be able to use this in handler function()
    }
}

export default WeatherFind;
