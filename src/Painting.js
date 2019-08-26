import React, {Component} from 'react';
import './App.scss';
import {Wiki} from './Wiki.js';
import {paginate} from './Helpers.js';

const ART_API_KEY = `${process.env.REACT_APP_ART_API_KEY}`;

export class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: -1
    }
    this.records = {}
    this.paginate = paginate.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  componentDidMount() {
    this.fetchPaintingData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setState({page: 0},
        this.fetchPaintingData());
    }
  }

  getCssValuePrefix() {
      let rtrnVal = '';
      const prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
      let dom = document.createElement('div');
      for (var i = 0; i < prefixes.length; i++) {
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';
        if (dom.style.background) rtrnVal = prefixes[i];
      }
      dom = null;
      return this.setStyle(rtrnVal);
  }

  setStyle(prefix) {
    const colors = this.records[this.state.page].colors;
    let gradient = '';
    for (let i = colors.length; i--;) {
      gradient += colors[i].color;
      gradient += (i===0) ? ')' : ', ';
    }
    document.body.style.background = `radial-gradient(circle at bottom right, ${gradient}`;
  };

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

  queryString() {
    return this.objToQueryString({
      apikey: ART_API_KEY,
      title: this.props.title,
      classification: 'Paintings',
      hasimage: 1,
      q: 'imagepermissionlevel:0',
      person: 'any',
      sort: 'random',
      color: 'any'
    })
  }

  fetchPaintingData() {
    fetch(`https://api.harvardartmuseums.org/object?${this.queryString()}`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {
         this.records = responseData.records;
         this.setState({
          page: 0
         })
      }).catch((error) => {
        document.querySelector('.search-error').style.display = 'block';
        console.log(error);
      });
  }

  setCity() {
    const birthplace = this.records[this.state.page].people[0].birthplace;
    if (birthplace) {
      return (birthplace.length > 23) ? birthplace.split(" ").pop() : birthplace;
    } else  if (this.records[this.state.page].culture) {
      return this.records[this.state.page].culture;
    } else {
      const division = this.records[this.state.page].division;
      return division.substr(0,division.indexOf(' '));
    }
  }

  render() {
    if (this.records[this.state.page]) {
      this.getCssValuePrefix();
      return (
        <div>
          <div className = "render-coontainer">
            <div className = "search-error">
              ERROR: {this.props.title} did not return any results
            </div>
            <div className = "painting flx-ctr">
              <div className = "painting__frame flx-ctr">
                <span className = "heading">{this.records[this.state.page].title}</span>
                <div className = "frame__cell left">
                  <img className="painting__image" src={this.records[this.state.page].primaryimageurl} alt={"image of " + this.records[this.state.page].title} />
                </div>
                <div className = "frame__cell right">
                  <div className = "painting__label">
                    <span className = "label__title row">{this.records[this.state.page].title}</span>
                    <span className = "label__artist row">{this.records[this.state.page].people[0].name}</span>
                    <span className = "label__region row">{this.setCity()}</span>
                    <span className = "label__dated row">{this.records[this.state.page].dated}</span>
                    <span className = "label__period row">{this.records[this.state.page].period}</span>
                    <span className = "label__medium row">{this.records[this.state.page].medium}</span>
                  </div>
                  <div className="painting__paging page">
                    {this.state.page + 1} of {this.records.length}
                    <br/>
                  <button className="prev" onClick={() => this.paginate(-1)} disabled={this.state.page === 0}>previous</button> | <button className="next" onClick={() => this.paginate(1)} disabled={this.state.page === this.records.length-1}>next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Wiki city = {this.setCity()} update={this.updateLatLng}/>
        </div>
      )
    } else {
      return (
        <div></div>
      );
    }
  }
};
