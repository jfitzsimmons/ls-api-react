import React, {Component} from 'react';
import './App.css';
import {Wiki} from './Wiki.js';
import {Map} from './Map.js';

const ART_API_KEY = `${process.env.REACT_APP_ART_API_KEY}`;
//let page = 0;
console.log('INIT painting.js');

export class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
    this.records = { 0:
      {
        title: `Rabbit Carrying Plum Branch`,
        primaryimageurl: `https://nrs.harvard.edu/urn-3:huam:DDC112702_dynmc`,
        people: { 0:
          {
            name: `Ukita Ikkei`,
            birthplace: `Kyoto`
          }
        },
        dated: `Late Edo period, 1855`,
        period: `Edo period, 1615-1868`,
        medium: `Hanging scroll; ink and light color on paper`,
        colors: {
          0:{color: `#FFFFFF`},
          1:{color: `#FFFFFF`},
          2:{color: `#FFFFFF`},
          3:{color: `#FFFFFF`}
        }
      }
    }
    this.paginate = this.paginate.bind(this);
  }


  componentDidUpdate(prevProps) {
    console.log(`componentDidUpdate - painting.js - prevProps.title: ${prevProps.title} | this.props.title: ${this.props.title}`);
    // ]Typical usage (don't forget to compare props):
    if (this.props.title !== prevProps.title) {
      console.log(`componentDidUpdate - in CONDITIONAL - painting.js`);

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
    const colors = this.records[this.state.page].colors;
    let gradient = '';

    for (var i = colors.length; i--;) {
      gradient += colors[i].color;
      gradient += (i===0) ? ')' : ', ';
    }

    let last = Object.keys(colors).length;

    let divStyle = {
      backgroundImage: `${prefix}linear-gradient(-45deg, ${gradient}`,
      borderTop: `20px solid ${colors[0].color}`,
      borderBottom: `20px solid ${colors[last-1].color}`
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
      classification: 'Paintings',
      hasimage: 1,
      q: 'imagepermissionlevel:0',
      person: 'any',
      sort: 'random'
    })
  }

  fetchPaintingData() {
  //  this.setState({page: 0});
    console.log('fetchPaintingData - API CALL - painting.js');

  // console.log(`PAINTING inside post api -TITLE: ${this.props.title}`);
    fetch(`https://api.harvardartmuseums.org/object?${this.queryString()}`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {
        // console.dir(responseData);
         this.records = responseData.records;
        //  console.dir(responseData.records);
        // console.log(this.records[this.state.page].title);
         this.props.update(responseData.records[this.state.page].people[0].birthplace);
      });
  }

  componentDidMount() {
    this.fetchPaintingData();
  }

  paginate(direction) {
    this.setState(prevState => {
      return {page: prevState.page += direction}
    });
    //page += direction;
  //  console.log(`page: ${this.records[this.state.page].primaryimageurl}`);
  }

  render() {
    console.log('PAINTING I was triggered during render PROPS TITLE:' + this.props.title);
    if (this.records[this.state.page]) {
    return (
      <div>
      <div className = "painting flx-ctr" style={this.getCssValuePrefix()}>
      <div className = "painting__frame flx-ctr">
        <div className = "frame__cell">
      <img className="painting__image" src={this.records[this.state.page].primaryimageurl} alt={"image of " + this.records[this.state.page].title} />
      <br/>
      </div>
      <div className = "frame__cell painting__label">
        {/*
      img src: {this.records[this.state.page].primaryimageurl}
      <br/>
      RECORDS LENGTH: {this.records.length}
      <br/>
      */}
      {this.records[this.state.page].people[0].name} | born: {this.records[this.state.page].people[0].birthplace}
      <br/>
      {this.records[this.state.page].title}
      <br/>
      {this.records[this.state.page].dated}
      <br/>
      {this.records[this.state.page].period}
      <br/>
      {this.records[this.state.page].medium}
      <br/>
      </div>
      </div>
      </div>
      <div>
      <button className="next" onClick={() => this.paginate(1)} disabled={this.state.page === this.records.length-1}>next</button> | <button className="prev" onClick={() => this.paginate(-1)} disabled={this.state.page === 0}>previous</button>
      </div>
      <Wiki city = {this.records[this.state.page].people[0].birthplace} update={this.updateLatLng}/>
    {/*   */}
      </div>

    )
  } else {
    return (
      <div> </div>
    );
  }
  }
};
