import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
// import {Map} from './Map.js';
import { paginate } from './Helpers.js';

export class Related extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.data = {};
    this.meta = {};
    this.paginate = paginate.bind(this);
  }

  componentDidMount() {
    const { entityId } = this.props;
    this.getWikiData(entityId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { entityId } = this.props;
    const { page } = this.state;
    if (entityId !== prevProps.entityId) {
      this.setState({
        page: 0,
      });
      this.getWikiData(entityId);
    }
    if (page !== prevState.page) {
      // console.log(`api call from paging`);
      this.getWikiData(entityId);
    }
  }

  getWikiData(eid) {
    const { p } = this.state;
    // console.log(`Page api call: ${p}`);
    fetch(`https://littlesis.org/api/entities/${eid}/relationships?page=${p}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.data = responseData.data;
        this.meta = responseData.meta;
        this.setState({});
      });
  }

  pageClick(p) {
    // console.log(`pageclick p: ${p}`);

    this.paginate(p);

    // this.getWikiData(this.props.city);
  }

  render() {
    const { page } = this.state;
    if (this.data[page]) {
      const entities = this.data;
      const descriptions = [];
      for (const entity of entities) {
        const desc = entity.attributes.description;
        descriptions.push(<li key={entity.id}>{desc}</li>);
      }
      return (
        <div className="map-wiki flx-ctr wrap">
          <div className="wiki">
            <div className="wiki__results">
              {/*
            <span className = "label__title row">Wikipedia results for {this.props.city}:</span>
            <span className = "label__title row">{this.data[this.state.page].title}</span>
            */}
              <ul>{descriptions}</ul>
              {/*
            <a className="wiki__link row" href={`https://${this.data[this.state.page].wikipediaUrl}`}>{this.data[this.state.page].title} on wikipedia</a>
            */}
            </div>
            <div className="page">
              {page} of {this.meta.pageCount} {/* SHOULD BE PAGECOUNT */}
              <br />
              <button type="button" className="prev" onClick={() => this.pageClick(-1)} disabled={page === 0}>
                previous
              </button>{' '}
              |
              <button
                type="button"
                className="next"
                onClick={() => this.pageClick(1)}
                disabled={page === this.data.length - 1}
              >
                next
              </button>
            </div>
          </div>
          <div className="map">
            {/* <Map lat={this.data[this.state.page].lat} lng={this.data[this.state.page].lng}/> */}
          </div>
        </div>
      );
    }
    return (
      <div className="map-wiki flx-ctr wrap">
        <div className="wiki">
          <div>
            <svg className="loading" viewBox="25 25 50 50">
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

Related.propTypes = {
  entityId: PropTypes.number.isRequired,
};
