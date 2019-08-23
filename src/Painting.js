import React, {Component} from 'react';
import './App.scss';
import {Wiki} from './Wiki.js';
import {Map} from './Map.js';
import {paginate} from './Helpers.js';

const ART_API_KEY = `${process.env.REACT_APP_ART_API_KEY}`;

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
    this.paginate = paginate.bind(this);
    this.setCity = this.setCity.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setState({page: 0});
      this.fetchPaintingData();
    }
  }

  getCssValuePrefix() {
      var rtrnVal = '';
      var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

      var dom = document.createElement('div');

      for (var i = 0; i < prefixes.length; i++)
      {
          dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';
          if (dom.style.background) rtrnVal = prefixes[i];
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
      sort: 'random',
      color: 'any'
    })
  }

  fetchPaintingData() {
   console.log(`PAINTING inside post api -TITLE: ${this.props.title}`);
    fetch(`https://api.harvardartmuseums.org/object?${this.queryString()}`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {
         this.records = responseData.records;
          console.dir(responseData.records);
        // console.log(this.records[this.state.page].title);
         this.props.update(responseData.records[this.state.page].people[0].birthplace);
      }).catch((error) => {
        console.log(error)
      });
  }

  componentDidMount() {
    this.fetchPaintingData();
  }

  setCity() {
    if (this.records[this.state.page].people[0].birthplace) {
      if (this.records[this.state.page].people[0].birthplace.length > 23) {
        const birthplace = this.records[this.state.page].people[0].birthplace;
        return birthplace.split(" ").pop();
      }
      return this.records[this.state.page].people[0].birthplace;
    } else  if (this.records[this.state.page].culture) {
      return this.records[this.state.page].culture;
    } else {
      const division = this.records[this.state.page].division;
      return division.substr(0,division.indexOf(' '));
    }
  }

  render() {
  //  console.log('PAINTING I was triggered during render PAGE:' + this.state.page);
    if (this.records[this.state.page]) {
    return (
      <div>
      <div className = "render-coontainer">
      <div className = "painting flx-ctr" style={this.getCssValuePrefix()}>
      <div className = "painting__frame flx-ctr">
        <div className = "frame__cell">
      <img className="painting__image" src={this.records[this.state.page].primaryimageurl} alt={"image of " + this.records[this.state.page].title} />
      <br/>
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
      <div className="painting__paging">
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
      <div> </div>
    );
  }
  }
};
