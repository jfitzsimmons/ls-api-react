import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Suggestions from './components/Suggestions';
import './App.scss';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'Trump',
      suggestions: [
        { id: 'bush', text: 'Bush' },
        { id: 'boeing', text: 'Boeing' },
        { id: 'mcconnell', text: 'McConnell' },
        { id: 'rnc', text: 'RNC' },
        { id: 'clinton', text: 'Clinton' },
        { id: 'feinstein', text: 'Feinstein' },
        { id: 'pfizer', text: 'Pfizer' },
      ],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    const { query } = this.state;
    const { updateTerm } = this.props;
    updateTerm(query);
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
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-search fa-w-16 fa-3x"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                className=""
              />
            </svg>
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
