import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import React, { Component } from 'react';
import '../css/App.css';
import { getGroupInfo, addPassenger } from '../firebase/firebase';
import { getUserId, getUserName } from '../Global/UserInfo';

//Join group
//Make the div clickable (navigates to chat page)
export default class Group extends Component {

  constructor(props) {
    super(props)
    this.state = {
      update: false,
      id: props.groupID,
      driver: '',
      capacity: 0,
      passengers: {}
    };

    getGroupInfo(props.groupID, this);
  }

  joinOnClick() {
    const username = getUserName()
    const userId = getUserId()
    console.log("clicked")
    console.log(username, userId)
    addPassenger(this.state.id, username, userId)
  }

  render() {
    let count = 0;
    let ridersDisplay = undefined;

    // very bad null handling
    if (this.state.passengers !== undefined) {
      ridersDisplay = Object.values(this.state.passengers).map((rider) =>
        <p className="item" key={count++}>{this.state.update && rider !== this.state.driver && rider}</p>
      );
    }

    return( 
      <Button
        variant="contained" 
            size="large"
            sx={{
              color:"black", 
              backgroundColor:"#F7F7F6",
              borderRadius: 5,
              ':hover': {
                backgroundColor: '#F7F7F6',
              },
              margin: 1
            }} 
            className="stacked box btn p3"
            >
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
          onClick={() => this.joinOnClick()}
          >
          <Typography
            variant="h7"
          >
            Join
          </Typography>
        </Button>
        </div>
        </Button>
    )
  }
}