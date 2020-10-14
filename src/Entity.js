import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { paginate } from './Helpers.js';

export class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 15108,
      page: 1,
      returnError: false,
    };
    this.data = {};
    this.paginate = paginate.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  componentDidMount() {
    this.fetchSearchData();
  }

  componentDidUpdate(prevProps) {
    const { term } = this.props;
    if (term !== prevProps.term) {
      this.setState(
        {
          page: 0,
        },
        this.fetchSearchData()
      );
    }
  }

  getCssValuePrefix() {
    let rtrnVal = '';
    const prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
    let dom = document.createElement('div');
    for (let i = 0; i < prefixes.length; i += 1) {
      dom.style.background = `${prefixes[i]}linear-gradient(#000000, #ffffff)`;
      if (dom.style.background) rtrnVal = prefixes[i];
    }
    dom = null;
    return this.setStyle(rtrnVal);
  }

  setStyle(prefix) {
    const { colors } = this.data[this.state.page];
    let gradient = '';
    for (let i = colors.length; i--; ) {
      gradient += colors[i].color;
      gradient += i === 0 ? ')' : ', ';
    }
    document.body.style.background = `radial-gradient(circle at bottom right, ${gradient}`;
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        // encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
        encodeURIComponent(obj[key])
      );
    }
    return keyValuePairs.join('&');
  }

  queryString() {
    return this.objToQueryString({
      // apikey: ART_API_KEY,
      term: this.props.term,
      // classification: "Paintings",
      // hasimage: 1,
      // q: "imagepermissionlevel:0",
      // person: "any",
      // sort: "random",
      // color: "any",
    });
  }

  fetchSearchData() {
    // console.log(`${this.queryString()}`);
    fetch(`https://littlesis.org/api/entities/search?q=${this.queryString()}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.data = responseData.data;
        if (this.data.length === 0) {
          return this.setState({
            returnError: true,
          });
        }
        this.setState({
          page: 0,
        });
      })
      .catch((error) => {
        this.setState({
          returnError: true,
        });
        console.log(error);
      });
  }

  setCity() {
    const { birthplace } = this.data[this.state.page].people[0];
    if (birthplace) {
      return birthplace.length > 23 ? birthplace.split(' ').pop() : birthplace;
    }
    if (this.data[this.state.page].culture) {
      return this.data[this.state.page].culture;
    }
    const { division } = this.data[this.state.page];
    return division.substr(0, division.indexOf(' '));
  }

  render() {
    const { page } = this.state;
    if (this.data[page]) {
      // this.getCssValuePrefix();
      return (
        <div>
          <div className="render-container">
            <div className="painting flx-ctr">
              <div className="painting__frame flx-ctr">
                <span className="heading"> {this.data[page].attributes.name} </span>{' '}
                <div className="frame__cell left">
                  {/*
                  <img
                    className="painting__image"
                    src={this.data[this.state.page].primaryimageurl}
                    alt={"image of " + this.data[this.state.page].title}
                  />{" "}
                  */}
                </div>{' '}
                <div className="frame__cell right">
                  <div className="painting__label">
                    <span className="label__title row">
                      {' '}
                      TITLEJPF:
                      {this.data[page].title}{' '}
                    </span>{' '}
                    <span className="label__artist row"> {this.data[page].attributes.blurb} </span>{' '}
                    <span className="label__dated row"> {this.data[page].attributes.summary} </span>{' '}
                    {/*
                    <span className="label__region row">
                      {" "}
                      {this.setCity()}{" "}
                    </span>{" "}
                    
                    <span className="label__period row">
                      {" "}
                      {this.data[this.state.page].period}{" "}
                    </span>{" "}
                    <span className="label__medium row">
                      {" "}
                      {this.data[this.state.page].medium}{" "}
                    </span>{" "}
                    */}
                  </div>{' '}
                  <div className="painting__paging page">
                    {' '}
                    {page + 1} of {this.data.length} <br />
                    <button type="button" className="prev" onClick={() => this.paginate(-1)} disabled={page === 0}>
                      {' '}
                      previous{' '}
                    </button>{' '}
                    |{' '}
                    <button
                      type="button"
                      className="next"
                      onClick={() => this.paginate(1)}
                      disabled={page === this.data.length - 1}
                    >
                      next
                    </button>
                  </div>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>
      );
    }
    const { returnError, term } = this.state;
    return (
      <div>
        <div className="render-container">
          {' '}
          {returnError ? (
            <div className="search-error">
              ERROR : {term}
              did not return any results{' '}
            </div>
          ) : (
            <div className="painting flx-ctr">
              <div>
                <svg className="loading" viewBox="25 25 50 50">
                  <circle cx="50" cy="50" r="20">
                    {' '}
                  </circle>{' '}
                </svg>{' '}
              </div>{' '}
            </div>
          )}{' '}
        </div>{' '}
      </div>
    );
  }
}

Entity.propTypes = {
  term: PropTypes.string.isRequired,
};
