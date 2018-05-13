import React, { Component } from 'react';
import axios from 'axios';

class StationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streaming: false,
      active: false
    }
  }

  handleDropDownClick = () => {
    this.setState({
      active: !this.state.active
    })
    console.log(this.state.active);
  }

  render() {
    let { active, streaming } = this.state;
    let listOfStations = null;

    this.props && active ? 
    listOfStations = this.props.stations.map((station, idx) => {
      console.log(station);
      return (
        <div className="list-item" key={idx}>
          <div id="details">
            <h3>{station['$'].name}</h3>
            <h5>{station['$'].genre}</h5>
          </div>
        </div>
      )
    })
    : listOfStations = null;


    return (
      <div className="list" onClick={this.handleDropDownClick}>
        <h1>{this.props.title}</h1>
        {listOfStations}
      </div>
    )
  }
}

export default StationList;