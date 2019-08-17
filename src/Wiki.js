import React, {Component} from 'react';
import './App.css';
import {Map} from './Map.js';

const WIKI_USER = `${process.env.REACT_APP_WIKI_USER}`;
console.log('wiki');
export class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geonames: { 0:
        {
          lat: 44.789722,
          lng: -88.599722,
          summary: "Test Summary",
          wikipediaUrl: "en.wikipedia.org"}
        }
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.city !== prevProps.city) {
      console.log('cDIDUPDATE');
       this.getWikiData(this.props.city);
    }
  }


  getWikiData(city) {
     console.log(`inside post api ${city}`);
    fetch(`http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${city}&maxRows=1&username=${WIKI_USER}&style=full`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {

        this.setState({
         geonames: responseData.geonames,
        })

      this.props.update(responseData.geonames[0].lat, responseData.geonames[0].lng);
      });
  }


  render() {
    console.log('WIKI I was triggered during render ' + this.props.city);

    return (
      <div className="mapWiki">
        <h1>WIKI</h1>
        <div className = "Wiki">
          <br/>
          {this.props.city}
          <br/>
          {this.state.geonames[0].summary}
          <br/>
          <a href={`https://${this.state.geonames[0].wikipediaUrl}`}>wikipedia</a>
          </div>
      </div>
    );
  }
};
