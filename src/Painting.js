import React, {Component} from 'react';
import './App.css';

export class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: this.props.records[2].colors,
      gradient: this.getCssValuePrefix(),
    }
  }

  getCssValuePrefix() {
      var rtrnVal = '';
      var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

      // Create a temporary DOM object for testing
      var dom = document.createElement('div');

      for (var i = 0; i < prefixes.length; i++)
      {
          // Attempt to set the style
          dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

          // Detect if the style was successfully set
          if (dom.style.background)
          {
              rtrnVal = prefixes[i];
          }
      }

      dom = null;

      return this.setStyle(rtrnVal);
  }

  setStyle(prefix) {
    const divStyle = {
      backgroundImage: prefix + 'linear-gradient(-45deg, ' +
        this.props.records[2].colors[0].color + ', ' +
        this.props.records[2].colors[1].color + ', ' +
        this.props.records[2].colors[2].color + ', ' +
        this.props.records[2].colors[3].color + ')'
    };
    return divStyle;
  };

  render() {
    return (
      <div className = "painting" style={this.state.gradient}>
      <div>
      <h1> Painting < /h1>
      <img className="painting__image" src={this.props.records[1].primaryimageurl} alt={"image of " + this.props.records[2].title} />
      <br/>
      img src: {this.props.records[1].primaryimageurl}
      <br/>
      {this.props.records[2].people[0].name} | born: {this.props.records[2].people[0].birthplace}
      <br/>
      {this.props.records[2].title}
      <br/>
      {this.props.records[2].dated}
      <br/>
      {this.props.records[2].period}
      <br/>
      {this.props.records[2].medium}
      </div> {} </div>
    )
  }
};
