import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import StationList from './components/stationlist';
import xml from 'xml2js';
import './App.css';
const castKey = process.env.REACT_APP_SHOUTCAST_KEY;
const stationUrl = process.env.REACT_APP_SHOUTCAST_STATION_URL;

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: ''
    }
  }

  getBroadcast = () => {
    let points = [];
    axios.get(`${stationUrl}classical${castKey}`)
    .then(res => {
      let data = res.data;
      xml.parseString(data, (err, result) => {
        console.log(result);
        result.stationlist.station.map(radio => radio['$'].streaming = false);
        this.setState({
          data: result.stationlist
        })
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getBroadcast();
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
