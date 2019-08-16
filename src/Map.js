import React, {
  Component
} from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

const MAP_API_KEY = `${process.env.REACT_APP_MAP_API_KEY}`;

const AnyReactComponent = ({text}) => < div > {text} < /div>;

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      zoom: 11
    }
  }


  render() {
    if (this.state.center) {
    return (
      // Important! Always set the container height explicitly

      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
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
