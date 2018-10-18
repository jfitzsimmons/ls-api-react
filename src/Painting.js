import React, {Component} from 'react';
import './App.css';

export class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //dom: document.getElementById('App'),
      colors: this.props.records[2].colors,
      gradient: this.getCssValuePrefix(),
    }
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  getCssValuePrefix() {
      var rtrnVal = '';//default to standard syntax
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
      console.log('set style func: ' + this.setStyle(rtrnVal));
      console.dir(this.setStyle(rtrnVal));
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
      <img src={this.props.records[2].primaryimageurl}  />
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
      <br/>
      {this.props.records[2].medium}
      </div> {
        /*
              <button id={this.props.minID}
                className="btn-level" value="-"
                onClick={this.props.onClick}>
                <i className="fa fa-arrow-down fa-2x"/>
              </button>
              <div id={this.props.lengthID} className="btn-level">
                {this.props.length}
              </div>
              <button id={this.props.addID}
                className="btn-level" value="+"
                onClick={this.props.onClick}>
                <i className="fa fa-arrow-up fa-2x"/>
              </button>
              */
      } </div>
    )
  }
};
