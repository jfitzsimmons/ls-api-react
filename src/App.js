import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Painting } from './Painting.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryString: this.queryString(),
      records: {},
    }
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

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
      title: "rabbit",
      classification: "Paintings"
    })
}

  componentDidMount(){
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
        console.dir(this.state.records[1]);
      });
   }

  render() {

    if (this.state.records[0]){
    //console.log("in render app js");
    //console.dir(this.state.records[0].title);

    return (
      <div id="App" className="App" >
        <Painting
              records={this.state.records}
          />
      </div>

    );
  } else {
    return (
      <div className="App" ></div>
    );
  }

  }
}

export default App;
