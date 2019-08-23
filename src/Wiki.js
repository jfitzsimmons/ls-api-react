import React, {Component} from 'react';
import './App.scss';
import {Map} from './Map.js';
import {paginate} from './Helpers.js';

const WIKI_USER = `${process.env.REACT_APP_WIKI_USER}`;

export class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geonames: { 0:
        {
          lat: 44.789722,
          lng: -88.599722,
          summary: "Test Summary",
          wikipediaUrl: "en.wikipedia.org"
        }
      },
      center: {},
      page: 0
    }
    this.paginate = paginate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.setState({page: 0});
      this.getWikiData(this.props.city);
    }
  }

  getWikiData(c) {
    console.log(`inside post WIKI api C: ${c}`);
    const city = c.replace(/ \(.*/g, "");
     console.log(`inside post WIKI api CITY: ${city}`);
    fetch(`http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${city}&username=${WIKI_USER}&style=full`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {

    //    console.log('GEONAME JSON');
        console.dir(responseData.geonames);

        this.setState({
         geonames: responseData.geonames,
         center: {
           lat: responseData.geonames[0].lat,
           lng: responseData.geonames[0].lng
         }
        })
      });
  }

  componentDidMount() {
    this.getWikiData(this.props.city);
  }

  render() {
  //  console.log('WIKI I was triggered during render PAGE:' + this.state.page);
    return (
      <div className="map-wiki flx-ctr wrap">
        <div className = "wiki">
          <div className = "wiki__results">
          <span className = "label__title row">Wikipedia results for {this.props.city}:</span>
          <span className = "label__title row">{this.state.geonames[this.state.page].title}</span>
          {this.state.geonames[this.state.page].summary}
          <br/>
          <a className="wiki__link row" href={`https://${this.state.geonames[this.state.page].wikipediaUrl}`}>{this.state.geonames[this.state.page].title} on wikipedia</a>
          </div>
          <div>
            {this.state.page + 1} of {this.state.geonames.length}
            <br/>
            <button className="prev" onClick={() => this.paginate(-1)} disabled={this.state.page === 0}>previous</button> | <button className="next" onClick={() => this.paginate(1)} disabled={this.state.page === this.state.geonames.length-1}>next</button>
            </div>
          </div>
          <div className = "map">
            <Map lat={this.state.geonames[this.state.page].lat} lng={this.state.geonames[this.state.page].lng}/>
          </div>
      </div>
    );
  }
};
