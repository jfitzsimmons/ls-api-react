import React, {
  Component
} from 'react';
import './App.css';
import {Search} from './Search.js';
import {Painting} from './Painting.js';
import {Wiki} from './Wiki.js';
import {Map} from './Map.js';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "rabbit",
      birthplace: "Chicago",
      classification: "Paintings",
      geonames: {},
      center: {
        lat: 22.789722,
        lng: -99.599722,
      }
    }
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBirthPlace = this.updateBirthPlace.bind(this);
    this.updateLatLng = this.updateLatLng.bind(this);
  }

  updateTitle(subject) {
    this.setState({title: subject});
    //console.log(`city change?: ${this.state.records[0].people[0].birthplace}`)
  }

  updateBirthPlace(bp) {
    console.log(`bp: ${bp}`);
    this.setState({birthplace: bp});
    //console.log(`city change?: ${this.state.records[0].people[0].birthplace}`)
  }

  updateLatLng(lt, lg) {
    this.setState({center: {
      lat: lt,
      lng: lg
    }});
    console.log(`lat lng? lat: ${lt} | lng: ${lg}`);
  }

  render() {

      return (
        <div id = "App" className = "App" >
          <h1>Parent: {this.state.title}</h1>
          <Search value={this.state.value} onChangeValue={this.searchChangeValue} update={this.updateTitle}/>
          <Painting title = {this.state.title} update={this.updateBirthPlace} records={this.state.records} classification={this.state.classification}/>
          <Wiki city = {this.state.birthplace} update={this.updateLatLng}/>
          <Map center={this.state.center}/>
        </div>
      );
  }
}

export default App;
