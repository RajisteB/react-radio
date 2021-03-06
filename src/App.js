import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import StationList from './components/stationlist';
import xml from 'xml2js';
import './App.css';
const castKey = process.env.REACT_APP_SHOUTCAST_KEY;
const stationUrl = process.env.REACT_APP_SHOUTCAST_STATION_URL;
const genres = [
  'classical', 'jazz', 'blues', 'hip hop', 
  'country', 'alternative', 'pop', 'talk', 
  'latin', 'reggae', 'r%26b', 'decades', 
  'new age', 'international', 'electronic', 'metal',
  'folk', 'easy listening', 'inspirational', 'public radio'
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: ''
    }
  }

  getBroadcast = () => {
    genres.map(genre => {
      let points = [];
      axios.get(`${stationUrl}${genre}${castKey}`)
      .then(res => {
        let data = res.data;

        // convert xml response to json
        xml.parseString(data, (err, result) => {

          // add a boolean to response object
          result.stationlist.station.map(radio => {
            radio['$'].streaming = false;
            radio['$'].error = false;
          });

          // dynamically create different setState key for each array item/genre
          this.setState({
            [genre]: result.stationlist
          })
        })

      }).catch(err => {
        console.log(err);
      })
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
          {genres.map((genre, idx) => {
            let title = genre.charAt(0).toUpperCase() + genre.substr(1);
            title === 'R%26b' ? title = 'R&B' : title;
            return <StationList title={title} stations={this.state[genre]} key={idx}/>
          })}
        </div>
      </div>
    );
  }
}

export default App;
