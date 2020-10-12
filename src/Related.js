import React, {Component} from 'react';
import './App.scss';
//import {Map} from './Map.js';
import {paginate} from './Helpers.js';

               const WIKI_USER = `${process.env.REACT_APP_WIKI_USER}`;

export class Related extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
    this.geonames = {}
    this.meta = {}
    this.paginate = paginate.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
 //   console.log(`DidUpdate prevState change: ${prevState.page}`);
 //   console.log(`DidUpdate state.page change: ${this.state.page}`);
    if (this.props.city !== prevProps.city) {
      this.setState({
        page: 0,
      })
      this.getWikiData(this.props.city);
    }
    if (this.state.page !== prevState.page) {
      console.log(`api call from paging`);
      this.getWikiData(this.props.city);
    }
  }

  getWikiData(c) {
    let p = this.state.page;
    console.log(`Page api call: ${p}`);
    fetch(`https://littlesis.org/api/entities/${c}/relationships?page=${p}`, {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseData) => {
      this.geonames = responseData.data;
      this.meta = responseData.meta;
      this.setState({
       
      })
    });
  }

  pageClick(p) {
    console.log(`pageclick p: ${p}`);
  
    this.paginate(p);

    
    //this.getWikiData(this.props.city);
  }

  componentDidMount() {
    this.getWikiData(this.props.city);
  }

  render() {
   if (this.geonames[this.state.page]) {
    const users = this.geonames;
    const final = [];
    for (let user of users) {
      let desc = user.attributes.description;
      final.push(<li key={user.id}>{desc}</li>);
    }
    return (
      <div className="map-wiki flx-ctr wrap">
        <div className = "wiki">
          <div className = "wiki__results">
            {/*
            <span className = "label__title row">Wikipedia results for {this.props.city}:</span>
            <span className = "label__title row">{this.geonames[this.state.page].title}</span>
            */}
            <ul>{final}</ul>
            {/*
            <a className="wiki__link row" href={`https://${this.geonames[this.state.page].wikipediaUrl}`}>{this.geonames[this.state.page].title} on wikipedia</a>
            */}
          </div>
          <div className="page">
            {this.state.page} of {this.meta.pageCount} {/* SHOULD BE PAGECOUNT */}
            <br/>
            <button className="prev" onClick={() => this.pageClick(-1)} disabled={this.state.page === 0}>previous</button> | 
            <button className="next" onClick={() => this.pageClick(1)} disabled={this.state.page === this.geonames.length-1}>next</button>
          </div>
        </div>
        <div className = "map">
         {/* <Map lat={this.geonames[this.state.page].lat} lng={this.geonames[this.state.page].lng}/> */}
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
