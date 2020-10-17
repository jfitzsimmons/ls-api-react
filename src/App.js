import React, { PureComponent } from 'react';
import './App.scss';
import { Search } from './Search.js';
import { Entity } from './Entity.js';
import { Related } from './Related.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      term: 'Trump',
      id: 15108,
    };
    this.updateTerm = this.updateTerm.bind(this);
    this.setId = this.setId.bind(this);
  }

  setId(id) {
    this.setState({
      id,
    });
  }

  updateTerm(subject) {
    this.setState({
      term: subject,
    });
  }

  render() {
    const { term, id } = this.state;
    return (
      <div id="App" className="App">
        <Search update={this.updateTerm} />
        <Entity term={term} setId={this.setId} />
        <Related entityId={id} />{' '}
      </div>
    );
  }
}

export default App;
