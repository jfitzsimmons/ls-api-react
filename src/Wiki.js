import React, {Component} from 'react';
import './App.css';
import {Map} from './Map.js';

export class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geonames: {},
      city: this.props.city,
    }
  }

  componentDidMount() {
    // console.log("inside post api");
    fetch(`http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${this.state.city}&maxRows=1&username=nufadzoo&style=full`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {
        // console.log("inside responsejson");
        // console.log('response object:',responseData);
        // console.dir(responseData);
        this.setState({
          geonames: responseData.geonames,
        })
        // console.log("in componentDidMount");
        //console.dir(this.state.geonames[0]);
      });
  }

  render() {
    if (this.state.geonames[0]) {
    return (
      <div className="mapWiki">
        <div className = "Wiki">
          <br/>
          {this.props.city}
          <br/>
          {this.state.geonames[0].summary}
          <br/>
          <a href={`https://${this.state.geonames[0].wikipediaUrl}`}>wikipedia</a>
        </div>
        <div className = "mapWrapper">
          <Map lat={this.state.geonames[0].lat} lng={this.state.geonames[0].lng}/>
        </div>
      </div>
    );
  } else {
      return (
        <div className = "Wiki" > < /div>
      );
    }
  }
};
