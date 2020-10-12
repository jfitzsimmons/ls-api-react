import React, { PureComponent } from "react";
import "./App.scss";
import { Search } from "./Search.js";
import { Entity } from "./Entity.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      term: "Trump",
    };
    this.updateTerm = this.updateTerm.bind(this);
  }

  updateTerm(subject) {
    this.setState({
      term: subject,
    });
  }

  render() {
    return (
      <div id="App" className="App">
        <Search update={this.updateTerm} /> 
        <Entity term={this.state.term} />{" "}
      </div>
    );
  }
}

export default App;
