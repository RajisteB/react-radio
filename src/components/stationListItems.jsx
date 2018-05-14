import React, { Component } from 'react';
import axios from 'axios';
import playBtn from '../images/play-button.svg';
import pauseBtn from '../images/pause.svg';
import antennae from '../images/antenna.svg';

class StationListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streaming: false,
      audio: '',
    }
  }

  handleStreamClick = (idx) => {
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
        console.log('running playstream');
      }).catch(err => {
        console.log(err);
    })
  }

  stopAudio = (idx) => {
    this.state.audio.pause();
    console.log('running: pause audio')
  }

  render() {
    let { tune } = this.props
    let singleStation = null;
    let colorStyling = null;
    let style = {
      width: '12%',
      height: '12%'
    }
    console.log(this.props.tune);

    return (
      <div className="list-item" key={tune.id}>
        <div className="details">
          <h3>{tune.name}</h3>
          <h5>{tune.genre}</h5>
        </div>
        <div className="playbtn" onClick={this.handleStreamClick} >
          {
            this.state.streaming ?
              <div className="now-playing">
                <img src={pauseBtn} style={style} alt="pause/stop" onClick={() => this.stopAudio(tune.id)} />
                <h6>streaming...</h6>
              </div> :
              <img src={playBtn} style={style} alt="play" onClick={() => this.playStream(tune.id)} />
          }
        </div>
      </div>
    )
  }
}

export default StationListItems;