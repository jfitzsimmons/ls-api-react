import React, { PureComponent } from "react";
import "./App.scss";
import { Search } from "./Search.js";
import { Entity } from "./Entity.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "Trump",
    };
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(subject) {
    this.setState({
      title: subject,
    });
  }

  render() {
    return (
      <div id="App" className="App">
        <Search update={this.updateTitle} /> 
        <Entity title={this.state.title} />{" "}
      </div>
    );
  }
}

export default App;
