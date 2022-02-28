import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { paginate } from './Helpers.js';

const objToQueryString = (obj) => {
  const keyValuePairs = [];
  Object.keys(obj).forEach((key) => {
    const hasBarProperty = Object.prototype.hasOwnProperty.call(obj, key);
    if (obj && hasBarProperty) {
      keyValuePairs.push(encodeURIComponent(obj[key]));
    }
  });
  return keyValuePairs.join('&');
};

export class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
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

  queryString() {
    const { term } = this.props;
    return objToQueryString({
      term,
    });
  }

  fetchSearchData() {
    const { setId } = this.props;
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
        this.setState(
          {
            page: 0,
            returnError: false,
          },
          setId(this.data[0].id)
        );
      })
      .catch((error) => {
        this.setState({
          returnError: true,
        });
      });
  }

  render() {
    const { page, returnError, term } = this.state;
    const { setId } = this.props;
    if (this.data[page] && !returnError) {
      return (
        <div>
          <div className="entity">
            <div>
              <div className="entity-name">{this.data[page].attributes.name}</div>{' '}
              <div className="entity-blurb"> {this.data[page].attributes.blurb} </div>
              <div> {this.data[page].attributes.summary} </div>{' '}
            </div>{' '}
            <div className="entity-paging paging">
              {' '}
              <div>More Results</div>
              <div>
                {page + 1} of {this.data.length}
              </div>
              <div className="entity-paging-buttons paging-buttons">
                {page === 0 ? null : (
                  <button
                    type="button"
                    className="prev entity-paging-buttons__button"
                    onClick={() => {
                      this.paginate(-1);
                      setId(this.data[page - 1].id);
                    }}
                  >
                    <span>{'<<'}&nbsp;</span>
                    <span className="entity-paging-button__text">{this.data[page - 1].attributes.name}</span>
                  </button>
                )}
                {page === this.data.length - 1 ? null : (
                  <button
                    type="button"
                    className="next entity-paging__button"
                    onClick={() => {
                      this.paginate(1);
                      setId(this.data[page + 1].id);
                    }}
                  >
                    <span className="entity-paging__button__text"> {this.data[page + 1].attributes.name} </span>{' '}
                    <span>&nbsp;{'>>'} </span>
                  </button>
                )}
              </div>
            </div>{' '}
          </div>
          {}
        </div>
      );
    }
    return (
      <div>
        {' '}
        {returnError ? (
          <div className="search-error">
            ERROR : {term}
            did not return any results{' '}
          </div>
        ) : (
          <div className="flx-ctr">
            <svg className="loading" viewBox="25 25 50 50">
              <circle cx="50" cy="50" r="20">
                {' '}
              </circle>{' '}
            </svg>{' '}
          </div>
        )}{' '}
      </div>
    );
  }
}

Entity.propTypes = {
  term: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
};
