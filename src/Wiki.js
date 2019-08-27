import React, {Component} from 'react';
import './App.scss';
import {Map} from './Map.js';
import {paginate} from './Helpers.js';

const WIKI_USER = `${process.env.REACT_APP_WIKI_USER}`;

export class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: -1
    }
    this.geonames = {}
    this.paginate = paginate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.getWikiData(this.props.city);
    }
  }

  getWikiData(c) {
    const city = c.replace(/ \(.*/g, '').replace(/\?/g, '');
    fetch(`https://cors-anywhere.herokuapp.com/http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${city}&username=${WIKI_USER}&style=full`, {
    // fetch(`http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${city}&username=${WIKI_USER}&style=full`, {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseData) => {
      this.geonames = responseData.geonames;
      this.setState({
       page: 0
      })
    });
  }

  componentDidMount() {
    this.getWikiData(this.props.city);
  }

  render() {
   if (this.geonames[this.state.page]) {
    return (
      <div className="map-wiki flx-ctr wrap">
        <div className = "wiki">
          <div className = "wiki__results">
            <span className = "label__title row">Wikipedia results for {this.props.city}:</span>
            <span className = "label__title row">{this.geonames[this.state.page].title}</span>
            {this.geonames[this.state.page].summary}
            <br/>
            <a className="wiki__link row" href={`https://${this.geonames[this.state.page].wikipediaUrl}`}>{this.geonames[this.state.page].title} on wikipedia</a>
          </div>
          <div className="page">
            {this.state.page + 1} of {this.geonames.length}
            <br/>
            <button className="prev" onClick={() => this.paginate(-1)} disabled={this.state.page === 0}>previous</button> | <button className="next" onClick={() => this.paginate(1)} disabled={this.state.page === this.geonames.length-1}>next</button>
          </div>
        </div>
        <div className = "map">
          <Map lat={this.geonames[this.state.page].lat} lng={this.geonames[this.state.page].lng}/>
        </div>
      </div>
      )
    } else {
      return (
        <div className="map-wiki flx-ctr wrap">
          <div className = "wiki">
            <div>
              <svg className="loading" viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
              </svg>
            </div>
          </div>
        </div>
      );
    };
  }
};
