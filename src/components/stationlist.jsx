import React, { Component } from 'react';
import axios from 'axios';
import playBtn from '../images/play-button.png';
import pauseBtn from '../images/two-lines.png';
const streamBase = {
  base: "/sbin/tunein-station.pls",
  m3uBase: "/sbin/tunein-station.m3u",
  xspfBase: "/sbin/tunein-station.xspf"
}

class StationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streaming: false,
      active: false,
      audio: ''
    }
  }

  handleDropDownClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  handleStreamClick = (idx) => {
    let { stations } = this.props
    stations.station[idx]['$'].streaming = !stations.station[idx]['$'].streaming;
    this.setState({
      streaming: !this.state.streaming
    })
  }

  playStream = (id) => {
    axios.get(`http://yp.shoutcast.com/sbin/tunein-station.pls?id=${id}`)
    .then(res => {
      let stream = res.data.split("\n")[2].split('=')[1] + '/;'
      let audio = new Audio(stream);
      audio.play();
      this.setState({ audio })

    })
  }

  render() {
    let { stations } = this.props
    let listOfStations = null;
    let { active, streaming, audio } = this.state;

    if (this.props && active) {

      listOfStations = stations.station.map((station, idx) => {
        return (
          <div className="list-item" key={station['$'].id}>
            <div className="details">
              <h3>{station['$'].name}</h3>
              <h5>{station['$'].genre}</h5>
            </div>
            <div className="playbtn" onClick={() => this.handleStreamClick(idx)} key={idx}>
              { 
                station['$'].streaming ? <img src={pauseBtn} alt="pause/stop" onClick={() => audio.pause()}/> : 
                  <img src={playBtn} alt="play" onClick={() => this.playStream(station['$'].id)} /> 
              }
            </div>
          </div>
        )
      })
    } else { 
      listOfStations = null;
    }

    return (
      <div className="list">
        <h1 onClick={this.handleDropDownClick}> 
          {this.props.title}
        </h1>
        {listOfStations}
      </div>
    )
  }
}

export default StationList;