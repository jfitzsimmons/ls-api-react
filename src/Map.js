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
      center: this.props.center,
      zoom: 11
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.center !== prevProps.center) {
      console.log('map did update');
      this.setState({
       center: this.props.center,
      })
    }
  }

  render() {
    console.log('MAP I was triggered during render ' + this.state.center.lat);
    if (this.state.center) {
    return (

      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          center={this.state.center}
          zoom={this.state.zoom}
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
