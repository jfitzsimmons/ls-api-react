import React, { PureComponent } from 'react';
import './App.scss';
import { Search } from './Search.js';
import { Entity } from './Entity.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      term: 'Trump',
    };
    this.updateTerm = this.updateTerm.bind(this);
  }

  updateTerm(subject) {
    this.setState({
      term: subject,
    });
  }

  render() {
    const { term } = this.state;
    return (
      <div id="App" className="App">
        <Search update={this.updateTerm} />
        <Entity term={term} />{' '}
      </div>
    );
  }
}

export default App;
