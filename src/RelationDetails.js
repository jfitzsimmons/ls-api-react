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
    const { id } = this.props;
    this.getRelationData(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (id !== prevProps.id) {
      this.getRelationData(id);
    }
  }

  getRelationData(id) {
    fetch(`https://littlesis.org/api/relationships/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          included: responseData.included[0],
        });
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
  id: PropTypes.number.isRequired,
};
