import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { paginate } from './Helpers.js';

export class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      returnError: false,
    };
    this.data = {};
    this.paginate = paginate.bind(this);
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

  objToQueryString = (obj) => {
    const keyValuePairs = [];
    Object.keys(obj).forEach((key) => {
      if (obj && obj.hasOwnProperty(key)) {
        keyValuePairs.push(encodeURIComponent(obj[key]));
      }
    });
    return keyValuePairs.join('&');
  };

  queryString() {
    const { term } = this.props;
    return this.objToQueryString({
      term,
    });
  }

  fetchSearchData() {
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

  render() {
    const { page } = this.state;
    const { setId } = this.props;
    if (this.data[page]) {
      return (
        <div>
          <div className="render-container">
            <div>
              <div>
                <h1> {this.data[page].attributes.name} </h1>
              </div>{' '}
              <div> {this.data[page].attributes.blurb} </div>
              <div> {this.data[page].attributes.summary} </div>{' '}
            </div>{' '}
            <div className="painting__paging page">
              {' '}
              {page + 1} of {this.data.length} <br />
              <button
                type="button"
                className="prev"
                onClick={() => {
                  this.paginate(-1);
                  setId(this.data[page - 1].id);
                }}
                disabled={page === 0}
              >
                {' '}
                previous{' '}
              </button>{' '}
              |{' '}
              <button
                type="button"
                className="next"
                onClick={() => {
                  this.paginate(1);
                  setId(this.data[page + 1].id);
                }}
                disabled={page === this.data.length - 1}
              >
                next
              </button>
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
  setId: PropTypes.func.isRequired,
};
