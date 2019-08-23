import React, {
  Component
} from 'react';
import './App.scss';
import {Search} from './Search.js';
import {Painting} from './Painting.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "rabbit",
      birthplace: "Chicago",
      geonames: {}
    }
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBirthPlace = this.updateBirthPlace.bind(this);
  }

  updateTitle(subject) {
    console.log(`APP - updateTitle`);
    this.setState({title: subject});
  }

  updateBirthPlace(bp) {
    console.log(`APP - updateBirthPlace`);
    this.setState({birthplace: bp});
  }

  render() {

      return (
        <div id = "App" className = "App" >
          <Search value={this.state.value} onChangeValue={this.searchChangeValue} update={this.updateTitle}/>
          <Painting title = {this.state.title} update={this.updateBirthPlace}/>
        </div>
      );
  }
}

export default App;
