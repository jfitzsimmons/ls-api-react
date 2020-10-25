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

  updateTerm(term) {
    this.setState({
      term,
    });
  }

  render() {
    const { term, id } = this.state;
    return (
      <div id="App" className="App">
        <div className="accent" />
        <div className="wrap">
          <header>
            <h1>Interlinked profiles of powerful individuals and organizations in the public and private sectors.</h1>
            <h2>
              -powered by <a href="https://littlesis.org">LittleSis</a>
            </h2>
          </header>
          <Search updateTerm={this.updateTerm} />
          <Entity term={term} setId={this.setId} />
          <Related entityId={id} />{' '}
        </div>
      </div>
    );
  }
}

export default App;
