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
    };
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
        console.dir(responseData.data);
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

  render() {
    const { relationships, page, relationId, entityId, active } = this.state;
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
              <button type="button" onClick={() => this.getRelationshipData(uniqueId)}>
                Relations {uniqueId}
              </button>
              <button className="button__details" type="button" onClick={() => this.myDetails(relation)}>
                Details {relation.id} <span className={active === relation ? activeStyle : 'arrow'}>></span>
              </button>
            </div>
          </li>
        );
      }
      return (
        <div className="flx-ctr wrap related">
          <div className="relationships flx-hlf">
            <div className="relationships__results">
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
                disabled={page === relationships.length - 1}
              >
                next
              </button>
            </div>
          </div>
          <div className="details flx-hlf">
            <RelationDetails rid={relationId} eid={entityId} />
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
