import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { RelationDetails } from './RelationDetails.js';
import { paginate } from './Helpers.js';

export class Related extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationships: {},
      page: 1,
      relationId: 1727566,
      entityId: 12,
      active: {},
      relatedOwner: '',
    };
    this.meta = {};
    this.paginate = paginate.bind(this);
    this.relatedOwner = this.relatedOwner.bind(this);
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
        this.meta = responseData.meta;
        this.setState({
          relationships: responseData.data,
          relationId: responseData.data[0].attributes.id,
          entityId: eid,
          active: responseData.data[0],
        });
      });
  }

  myDetails(relation) {
    this.setState({
      relationId: relation.id,
      active: relation,
    });
  }

  _handleClick(r) {
    this.setState({ active: r });
  }

  relatedOwner(relatedOwner) {
    this.setState({
      relatedOwner,
    });
  }

  render() {
    const { relationships, page, relationId, entityId, active, relatedOwner } = this.state;
    const activeStyle = 'arrow active';

    if (relationships[page]) {
      const descriptions = [];
      for (const relation of relationships) {
        const desc = relation.attributes.description;
        const uniqueId =
          entityId === relation.attributes.entity1_id ? relation.attributes.entity2_id : relation.attributes.entity1_id;
        descriptions.push(
          <li key={relation.id}>
            <div className="description">{desc}</div>
            <div className="buttons">
              <button
                type="button"
                className="button__relationships"
                onClick={() => this.getRelationshipData(uniqueId)}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="address-book"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="svg-inline--fa fa-address-book fa-w-14 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-68 304H48V48h320v416zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z"
                    className=""
                  />
                </svg>
              </button>
              <button className="button__details" type="button" onClick={() => this.myDetails(relation)}>
                Details {/* relation.id */} <span className={active === relation ? activeStyle : 'arrow'}>></span>
              </button>
            </div>
          </li>
        );
      }
      return (
        <div className="flx-ctr wrap related">
          <div className="relationships flx-hlf">
            <div className="relationships__results">
              <div className="relationships__results__title">
                <div>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="address-book"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="svg-inline--fa fa-address-book fa-w-14 fa-3x"
                  >
                    <path
                      fill="currentColor"
                      d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-68 304H48V48h320v416zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z"
                      className=""
                    />
                  </svg>
                </div>
                <div>Relationships of {relatedOwner}</div>
              </div>
              <ul>{descriptions}</ul>
            </div>
            <div className="page">
              Page {page} of {this.meta.pageCount}
              <br />
              <button type="button" className="prev" onClick={() => this.paginate(-1)} disabled={page === 1}>
                previous
              </button>{' '}
              <button
                type="button"
                className="next"
                onClick={() => this.paginate(1)}
                disabled={page === relationships.length - 1}
              >
                next
              </button>
            </div>
          </div>
          <div className="details flx-hlf">
            <RelationDetails rid={relationId} eid={entityId} relatedOwner={this.relatedOwner} />
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
