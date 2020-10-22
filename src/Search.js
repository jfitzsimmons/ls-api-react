import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Suggestions from './components/Suggestions';
import './App.scss';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      suggestions: [
        { id: 'bush', text: 'Bush' },
        { id: 'walmart', text: 'Walmart' },
        { id: 'mcconnell', text: 'McConnell' },
        { id: 'gop', text: 'GOP' },
        { id: 'clinton', text: 'Clinton' },
        { id: 'dnc', text: 'DNC' },
        { id: 'bayer', text: 'Bayer' },
      ],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleInput = (e) => {
    this.setState({ query: e.target.value });
  };

  handleKeypress = (e) => {
    const { query } = this.state;
    const { updateTerm } = this.props;
    if (e.charCode === 13) {
      updateTerm(query);
    }
  };

  render() {
    const { suggestions, query } = this.state;
    const { updateTerm } = this.props;
    const links = [];
    for (const suggestion of suggestions) {
      links.push(
        <button type="button" key={suggestion.id} className="text" onClick={() => updateTerm(suggestion.text)}>
          {suggestion.text}
        </button>
      );
    }
    return (
      <div>
        <div className="search">
          <div className="search__field">
            <input onChange={this.handleInput} onKeyPress={this.handleKeypress} placeholder="Enter a search term" />{' '}
            <button type="button" onClick={() => updateTerm(query)}>
              Search
            </button>
          </div>
          {/* <Suggestions results={this.state.results} /> */}
          <div className="search__suggestions">Suggestions: {links}</div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  updateTerm: PropTypes.func.isRequired,
};
