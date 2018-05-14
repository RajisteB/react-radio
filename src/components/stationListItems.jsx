import React, { Component } from 'react';
import axios from 'axios';
import playBtn from '../images/play-button.svg';
import pauseBtn from '../images/pause.svg';
import antennae from '../images/antenna.svg';

class StationListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: '',
      error: false,
      streaming: false,
    }
  }

  handleStreamClick = (idx) => {
    this.setState({
      streaming: !this.state.streaming
    })
  }

  playStream = (id) => {
    axios.get(`http://yp.shoutcast.com/sbin/tunein-station.pls?id=${id}`)
      .catch(error => {
        return Promise.reject(error.response);
        console.log('Error:' + error.message);
        this.setState({
          error: true
        })
      }).then(res => {
        let stream = res.data.split("\n")[2].split('=')[1] + '/;'
        let audio = new Audio(stream);
        audio.play();
        this.setState({ audio })
        console.log('running playstream');
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
    let streamError = null;
    let style = {
      width: '12%',
      height: '12%'
    }
    // console.log(this.props.tune);
    console.log(this.state.error);
    console.log(tune.id);

    this.state.error ? 
    streamError = <h6>ERROR: Technical Difficulties, please try again at a later time.</h6> :
    streamError = <h6>streaming...</h6>

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
                {streamError}
              </div> :
              <img src={playBtn} style={style} alt="play" onClick={() => this.playStream(tune.id)} />
          }
        </div>
      </div>
    )
  }
}

export default StationListItems;