import React, { Component } from 'react';
import axios from 'axios';
import playBtn from '../images/play-button.svg';
import pauseBtn from '../images/pause.svg';
import antennae from '../images/antenna.svg';
import StationListItems from './stationListItems';

class StationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // streaming: false,
      active: false,
      // audio: '',
    }
  }

  handleDropDownClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  // handleStreamClick = (idx) => {
  //   let { stations } = this.props
  //   stations.station[idx]['$'].streaming = !stations.station[idx]['$'].streaming 
  //   console.log(stations.station[idx]['$'].streaming);
  //   console.log('running: handlestreamclick')
  //   console.log(!this.state.streaming);
  //   this.setState({
  //     streaming: !this.state.streaming
  //   })
  // }

  // playStream = (id) => {
  //   if (this.state.streaming === false ) {
  //     axios.get(`http://yp.shoutcast.com/sbin/tunein-station.pls?id=${id}`)
  //     .then(res => {
  //       let stream = res.data.split("\n")[2].split('=')[1] + '/;'
  //       let audio = new Audio(stream);
  //       audio.play();
  //       this.setState({ audio })
  //       console.log('running playstream');
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }

  // stopAudio = (idx) => {
  //   this.state.audio.pause();
  //   console.log('running: pause audio')
  // }

  render() {
    let { stations } = this.props
    let listOfStations = null;
    let colorStyling = null;
    let style = {
      width: '12%',
      height: '12%'
    }

    // if (active) {

    //   listOfStations = stations.station.map((station, idx) => {
    //     return (
    //       <div className="list-item" key={station['$'].id}>
    //         <div className="details">
    //           <h3>{station['$'].name}</h3>
    //           <h5>{station['$'].genre}</h5>
    //         </div>
    //         <div className="playbtn" onClick={() => this.handleStreamClick(idx)} key={idx}>
    //           { 
    //             station['$'].streaming ? 
    //               <div className="now-playing"> 
    //                 <img src={pauseBtn} style={style} alt="pause/stop" onClick={() => this.stopAudio(idx)}/> 
    //                 <h6>streaming...</h6>
    //               </div> : 
    //               <img src={playBtn} style={style} alt="play" onClick={() => this.playStream(station['$'].id)} /> 
    //           }
    //         </div>
    //       </div>
    //     )
    //   })
    // } else { 
    //   listOfStations = null;
    // }

    if (this.state.active) {
      listOfStations = stations.station.map((fm, idx) => {
        return <StationListItems tune={fm['$']} key={idx} />
      })
    } else {
      listOfStations = null;
    }

    colorStyling = this.state.active ? { color: '#00d8ff' } : { color: '#fff' };

    return (
      <div className="list">
        <div className="title">
          <h1 onClick={this.handleDropDownClick} style={colorStyling}> 
            {this.props.title}
          </h1>
          <img src={antennae} alt=""/>
        </div>
        {listOfStations}
      </div>
    )
  }
}

export default StationList;