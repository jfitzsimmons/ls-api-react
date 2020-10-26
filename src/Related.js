import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { RelationDetails } from './RelationDetails.js';
import { paginate, removeDuplicates } from './Helpers.js';

export class Related extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationships: {},
      page: 1,
      relationsId: 0,
      detailsId: 0,
      localEntityId: 0,
      active: {},
      relatedOwner: '',
      returnError: false,
    };
    this.meta = {};
    this.paginate = paginate.bind(this);
    this.removeDuplicates = removeDuplicates.bind(this);
    this.relatedOwner = this.relatedOwner.bind(this);
  }

  componentDidMount() {
    const { entityId } = this.props;
    this.getRelationshipData(entityId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { entityId } = this.props;
    const { page, relationsId, localEntityId } = this.state;

    if (entityId !== prevProps.entityId) {
      this.getRelationshipData(entityId, 1);
    }

    if (relationsId !== prevState.relationsId) {
      this.getRelationshipData(relationsId);
    } else if (page !== prevState.page) {
      this.getRelationshipData(localEntityId);
    }
  }

  getRelationshipData(eid, p) {
    const { page } = this.state;
    const queryPage = p ? 1 : page;
    fetch(`https://littlesis.org/api/entities/${eid}/relationships?page=${queryPage}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data.length === 0) {
          return this.setState({
            returnError: true,
          });
        }
        // console.log(`responseData.data`);
        // console.dir(responseData.data);
        this.meta = responseData.meta;
        this.setState({
          relationships: responseData.data,
          detailsId: responseData.data[0].attributes.id,
          localEntityId: eid,
          active: responseData.data[0],
          returnError: false,
          page: queryPage,
        });
      })
      .catch((error) => {
        this.setState({
          returnError: true,
        });
        console.error(error);
      });
  }

  myRelations(relationsId) {
    this.setState({
      relationsId,
      page: 1,
    });
  }

  myDetails(relation) {
    this.setState({
      detailsId: relation.id,
      active: relation,
    });
  }

  relatedOwner(relatedOwner) {
    this.setState({
      relatedOwner,
    });
  }

  render() {
    const { relationships, page, detailsId, localEntityId, active, relatedOwner } = this.state;
    const activeStyle = 'arrow active';
    if (relationships[0]) {
      const descriptions = [];
      const filteredRelationships = this.removeDuplicates(relationships, 'id');
      for (const relation of filteredRelationships) {
        const desc = relation.attributes.description;
        const uniqueId =
          localEntityId === relation.attributes.entity1_id
            ? relation.attributes.entity2_id
            : relation.attributes.entity1_id;
        descriptions.push(
          <li key={relation.id} className={active === relation ? activeStyle : 'arrow'}>
            <div className="related-description">{desc}</div>
            <div className="related-buttons">
              <button
                type="button"
                className="buttons-relationships__button"
                onClick={() => this.myRelations(uniqueId)}
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
              <button className="buttons-details__button" type="button" onClick={() => this.myDetails(relation)}>
                Details<span className={active === relation ? activeStyle : 'arrow'}>{'>'}</span>
              </button>
            </div>
          </li>
        );
      }
      return (
        <div className="flx-ctr related">
          <div className="relationships">
            <div className="relationships-results">
              <div className="results-header">
                <div className="results-header-top">
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
                  <div className="results-header-top__text">Relationships of {relatedOwner}</div>
                </div>
                <div className="results-header-bottom">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="hand-point-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="svg-inline--fa fa-hand-point-down fa-w-14 fa-3x"
                  >
                    <path
                      fill="currentColor"
                      d="M188.8 512c45.616 0 83.2-37.765 83.2-83.2v-35.647a93.148 93.148 0 0 0 22.064-7.929c22.006 2.507 44.978-3.503 62.791-15.985C409.342 368.1 448 331.841 448 269.299V248c0-60.063-40-98.512-40-127.2v-2.679c4.952-5.747 8-13.536 8-22.12V32c0-17.673-12.894-32-28.8-32H156.8C140.894 0 128 14.327 128 32v64c0 8.584 3.048 16.373 8 22.12v2.679c0 6.964-6.193 14.862-23.668 30.183l-.148.129-.146.131c-9.937 8.856-20.841 18.116-33.253 25.851C48.537 195.798 0 207.486 0 252.8c0 56.928 35.286 92 83.2 92 8.026 0 15.489-.814 22.4-2.176V428.8c0 45.099 38.101 83.2 83.2 83.2zm0-48c-18.7 0-35.2-16.775-35.2-35.2V270.4c-17.325 0-35.2 26.4-70.4 26.4-26.4 0-35.2-20.625-35.2-44 0-8.794 32.712-20.445 56.1-34.926 14.575-9.074 27.225-19.524 39.875-30.799 18.374-16.109 36.633-33.836 39.596-59.075h176.752C364.087 170.79 400 202.509 400 248v21.299c0 40.524-22.197 57.124-61.325 50.601-8.001 14.612-33.979 24.151-53.625 12.925-18.225 19.365-46.381 17.787-61.05 4.95V428.8c0 18.975-16.225 35.2-35.2 35.2zM328 64c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24z"
                      className=""
                    />
                  </svg>
                </div>
              </div>
              <ul>{descriptions}</ul>
            </div>
            <div className="relationships-paging">
              <div>
                Page {page} of {this.meta.pageCount}
              </div>
              <div className="paging-buttons">
                <button type="button" className="prev" onClick={() => this.paginate(-1)} disabled={page === 1}>
                  previous
                </button>{' '}
                <button
                  type="button"
                  className="next"
                  onClick={() => this.paginate(1)}
                  disabled={page === this.meta.pageCount}
                >
                  next
                </button>
              </div>
            </div>
          </div>
          <div className="details">
            <RelationDetails did={detailsId} eid={localEntityId} relatedOwner={this.relatedOwner} />
          </div>
        </div>
      );
    }
    const { returnError } = this.state;
    return (
      <div>
        <div>
          {' '}
          {returnError ? (
            <div className="search-error">
              ERROR : {localEntityId}
              did not return any results{' '}
            </div>
          ) : (
            <div className="flx-ctr">
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

Related.propTypes = {
  entityId: PropTypes.number.isRequired,
};
