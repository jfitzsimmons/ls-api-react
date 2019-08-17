import React, {Component} from 'react';
import './App.css';

const ART_API_KEY = `${process.env.REACT_APP_ART_API_KEY}`;

export class Painting extends Component {
  constructor(props) {
    super(props);
    this.records = {}
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.title !== prevProps.title) {
      this.fetchPaintingData();
    }
  }

  getCssValuePrefix() {
      var rtrnVal = '';
      var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

      // Create a temporary DOM object for testing
      var dom = document.createElement('div');

      for (var i = 0; i < prefixes.length; i++)
      {
          // Attempt to set the style
          dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

          // Detect if the style was successfully set
          if (dom.style.background)
          {
              rtrnVal = prefixes[i];
          }
      }

      dom = null;

      return this.setStyle(rtrnVal);
  }

  setStyle(prefix) {
    const divStyle = {
      backgroundImage: prefix + 'linear-gradient(-45deg, ' +
        this.records[0].colors[0].color + ', ' +
        this.records[0].colors[1].color + ', ' +
        this.records[0].colors[2].color + ', ' +
        this.records[0].colors[3].color + ')'
    };
    return divStyle;
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
      classification: this.props.classification
    })
  }

  fetchPaintingData() {
   console.log(`PAINTING inside post api -TITLE: ${this.props.title}`);
    fetch(`https://api.harvardartmuseums.org/object?${this.queryString()}`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {
        // console.dir(responseData);
         this.records = responseData.records;
        // console.log(this.records[0].title);
         this.props.update(responseData.records[0].people[0].birthplace);
      });
  }

  componentDidMount() {
    this.fetchPaintingData();
  }

  render() {
    if (this.records[0]) {
    return (
      <div className = "painting" style={this.getCssValuePrefix()}>
      <div>
      <h1> Painting < /h1>
      <img className="painting__image" src={this.records[0].primaryimageurl} alt={"image of " + this.records[0].title} />
      <br/>
      img src: {this.records[0].primaryimageurl}
      <br/>
      {this.records[0].people[0].name} | born: {this.records[0].people[0].birthplace}
      <br/>
      {this.records[0].title}
      <br/>
      {this.records[0].dated}
      <br/>
      {this.records[0].period}
      <br/>
      {this.records[0].medium}
      </div>
      </div>
    )
  } else {
    return (
      <div> </div>
    );
  }
  }
};
