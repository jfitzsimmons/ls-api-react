import React, {PureComponent} from 'react';
import './App.scss';
import {Search} from './Search.js';
import {Painting} from './Painting.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "horse",
      birthplace: "Chicago",
      geonames: {}
    }
    this.title = "horse";
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(subject) {
    this.setState({title: subject});
  }

  render() {
    return (
      <div id = "App" className = "App" >
        <Search value={this.state.value} update={this.updateTitle}/>
        <Painting title = {this.state.title} />
      </div>
    );
  }
}

export default App;
