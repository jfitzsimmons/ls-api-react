import React, { PureComponent } from 'react';
// import GoogleMapReact from 'google-map-react';
// import {MapMarker} from './MapMarker.js';
import './App.scss';

export class Map extends PureComponent {
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
    if (this.props.lat !== prevProps.lat) {
      this.setState({
        center: {
          lat: this.props.lat,
          lng: this.props.lng,
        },
      });
    }
  }

  getRelationData(rid) {
    // const { page } = this.state;
    // console.log(`Page api call: ${p}`);
    fetch(`https://littlesis.org/api/relationships/${rid}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        // this.meta = responseData.meta;
        this.setState({
          included: responseData.included[0],
        });
      });
  }

  render() {
    if (this.state.included.attributes) {
      return (
        <div className="map-container">
          <h1>{this.state.included.attributes.name}</h1>
          <p>{this.state.included.attributes.blurb}</p>
          <p>{this.state.included.attributes.summary}</p>
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
