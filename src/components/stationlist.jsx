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
      active: false,
    }
  }

  handleDropDownClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    let { stations } = this.props
    let listOfStations = null;
    let colorStyling = null;
    let style = {
      width: '12%',
      height: '12%'
    }

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