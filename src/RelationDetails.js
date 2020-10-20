import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './App.scss';

export class RelationDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      included: {},
    };
  }

  componentDidMount() {
    const { rid, eid } = this.props;
    this.getRelationData(eid, rid);
  }

  componentDidUpdate(prevProps) {
    const { rid, eid } = this.props;
    if (rid !== prevProps.rid) {
      this.getRelationData(eid, rid);
    }
  }

  getRelationData(eid, rid) {
    const { relatedOwner } = this.props;
    fetch(`https://littlesis.org/api/relationships/${rid}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          // included: responseData.included[0],
          included: eid === responseData.included[0].id ? responseData.included[1] : responseData.included[0],
        });
        const ro =
          eid === responseData.included[0].id
            ? responseData.included[0].attributes.name
            : responseData.included[1].attributes.name;
        // console.dir(ro);
        relatedOwner(ro);
      });
  }

  render() {
    const { included } = this.state;
    if (included.attributes) {
      return (
        <div className="details__window">
          <p className="details__window__name">{included.attributes.name}</p>
          <div className="details__window__summary">
            <p className="darkergray blurb">{included.attributes.blurb}</p>
            <p>{included.attributes.summary}</p>
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

RelationDetails.propTypes = {
  rid: PropTypes.number.isRequired,
  eid: PropTypes.number.isRequired,
};
