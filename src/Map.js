import React, {
  Component
} from 'react';
import GoogleMapReact from 'google-map-react';
import {MapMarker} from './MapMarker.js';
import './App.scss';

const MAP_API_KEY = `${process.env.REACT_APP_MAP_API_KEY}`;

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center,
      zoom: 10
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat) {
    //  console.log('map did update');
      this.setState({
       center: {
         lat: this.props.lat,
         lng: this.props.lng
       }
      })
    }
  }

  render() {
    if (this.state.center) {
      console.log('MAP I was triggered during render ' + this.state.center.lat);

    return (

      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          <MapMarker
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>

    );
  } else {
    return (
      <div></div>
    );
  }
  }
}
