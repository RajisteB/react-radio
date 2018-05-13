import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import StationList from './components/stationlist';
import xml from 'xml2js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: ''
    }
  }

  getCast = () => {
    let key = '9u4OLchloDTnZgPo';
    axios({
      method: 'get',
      url: 'http://api.shoutcast.com/legacy/genresearch?k=9u4OLchloDTnZgPo&genre=classic&limit=10',
      // responseType: 'document'
    })
    .then(res => {
      let data = res.data;
      xml.parseString(data, (err, result) => {
        this.setState({
          data: result.stationlist.station
        })
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getCast();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Radio</h1>
        </header>
        <div className="App-intro">
          <StationList title="Classical" stations={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
