import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { RelationDetails } from './RelationDetails.js';
import { paginate } from './Helpers.js';

export class Related extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      relationId: 1727566,
    };
    this.data = {};
    this.meta = {};
    this.paginate = paginate.bind(this);
  }

  componentDidMount() {
    const { entityId } = this.props;
    this.getRelationshipData(entityId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { entityId } = this.props;
    const { page } = this.state;

    if (entityId !== prevProps.entityId) {
      this.setState({
        page: 1,
      });
      this.getRelationshipData(entityId);
    }
    if (page !== prevState.page) {
      this.getRelationshipData(entityId);
    }
  }

  getRelationshipData(eid) {
    const { page } = this.state;
    fetch(`https://littlesis.org/api/entities/${eid}/relationships?page=${page}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.data = responseData.data;
        this.meta = responseData.meta;
        this.setState({});
      });
  }

  render() {
    const { page, relationId } = this.state;
    if (this.data[page]) {
      const relations = this.data;
      const descriptions = [];
      for (const relation of relations) {
        const desc = relation.attributes.description;
        const entityId1 = relation.attributes.entity1_id;
        descriptions.push(
          <li key={relation.id}>
            {desc}
            <button type="button">More CHANGE {entityId1}</button>
          </li>
        );
      }
      return (
        <div className="map-wiki flx-ctr wrap">
          <div className="wiki">
            <div className="wiki__results">
              <ul>{descriptions}</ul>
            </div>
            <div className="page">
              {page} of {this.meta.pageCount}
              <br />
              <button type="button" className="prev" onClick={() => this.paginate(-1)} disabled={page === 1}>
                previous
              </button>{' '}
              |
              <button
                type="button"
                className="next"
                onClick={() => this.paginate(1)}
                disabled={page === this.data.length - 1}
              >
                next
              </button>
            </div>
          </div>
          <div className="details">
            <RelationDetails id={relationId} />
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
