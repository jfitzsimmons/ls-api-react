import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import {Search} from './Search.js';
import {Painting} from './Painting.js';
import {Wiki} from './Wiki.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryString: this.queryString(),
      records: {},
    }
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  searchChangeValue = e => this.setState({queryString:{title: e.target.value}});

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

  queryString() {
    return this.objToQueryString({
      apikey: "8e5a3900-d2f8-11e8-8958-d16e90e2bdfe",
      title: "duck",
      classification: "Paintings"
    })
  }

  componentDidMount() {
    // console.log("inside post api");
    fetch(`https://api.harvardartmuseums.org/object?${this.state.queryString}`, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseData) => {
        // console.log("inside responsejson");
        // console.log('response object:',responseData);
        // console.dir(responseData);
        this.setState({
          records: responseData.records,
        })
        // console.log("in componentDidMount");
        //console.dir(this.state.records[1]);
      });
  }

  render() {

    if (this.state.records[0]) {
      //console.log("in render app js");
      //console.dir(this.state.records[0].title);

      return (
        <div id = "App" className = "App" >
        <Search value={this.state.value} onChangeValue={this.searchChangeValue} />
        <Painting records = {this.state.records} />
        <Wiki city = {this.state.records[2].people[0].birthplace} />

        </div>
      );
    } else {
      return (
        <div className = "App" > < /div>
      );
    }

  }
}

export default App;
