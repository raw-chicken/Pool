import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import React, { Component } from 'react';
import '../css/App.css';
import { getGroupInfo } from '../firebase/firebase';

export default class Group extends Component {

  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      update: false,
      id: props.groupID,
      driver: '',
      capacity: 0,
      passengers: {}
    };

    console.log("Getting group info of", props.groupID);
    getGroupInfo(props.groupID, this);
    console.log(this);
  }

  render() {
    let count = 0;
    console.log(Object.values(this.state.passengers));
    const ridersDisplay = Object.values(this.state.passengers).map((rider) =>
      <p className="item" key={count++}>{this.state.update && rider !== this.state.driver && rider}</p>
    );
    console.log(this.state.capacity)

    return( 
      <div className="box p3">
        <h3 className="item">{this.state.update && this.state.driver} ({count}/{this.state.update && this.state.capacity})</h3>
        {this.state.update && ridersDisplay}
        <div className="item">
        <Button 
          variant="contained" 
          size="small"
          sx={{
            color:"#F7F7F6", 
            backgroundColor:"#77BB3F",
            ':hover': {
            backgroundColor: '#77BB3F',
            }
          }} 
          className="btn"
          >
          <Typography
            variant="h7"
          >
            Edit
          </Typography>
        </Button>
        <Button 
          variant="contained" 
          size="small"
          sx={{
            color:"#F7F7F6", 
            backgroundColor:"#77BB3F",
            ':hover': {
            backgroundColor: '#77BB3F',
            }
          }} 
          className="btn"
          >
          <Typography
            variant="h7"
          >
            Join
          </Typography>
        </Button>
        </div>
      </div>
    )
  }
}