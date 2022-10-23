import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import React, { Component } from 'react';
import {withRouter} from '../withRouter';
import '../css/App.css';
import { getGroupInfo, addPassenger } from '../firebase/firebase';
import { getUserId, getUserName } from '../Global/UserInfo';

class Group extends Component {

  constructor(props) {
    super(props)
    this.state = {
      eventId: props.eventID,
      update: false,
      id: props.groupID,
      driver: '',
      count: 0,
      capacity: 0,
      passengers: {}
    };

    this.openChat=this.openChat.bind(this);
    getGroupInfo(props.groupID, this);
  }

  joinOnClick() {
    if (this.state.count >= this.state.capacity) return;
    const username = getUserName()
    const userId = getUserId()
    console.log("clicked")
    console.log(username, userId)
    addPassenger(this.state.id, username, userId)
    this.setState({update: true})
    getGroupInfo(this.state.id, this)
  }

  openChat = (event) => {
    this.props.navigate(`/event/${this.state.eventId}/chat/${this.state.id}`)
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

    this.setState({count: count});

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
          width:"100%",
          margin: 1,
        }} 
        className="horizontal-stack box btn p3"
        onClick={this.openChat}
      >
        {/* left box */}
        <Box
          sx={{
            // display:"flex",
            width:"70%"
          }}
        >
          <h3 className="item">{this.state.update && this.state.driver} ({count}/{this.state.update && this.state.capacity})</h3>
          {this.state.update && ridersDisplay}
        </Box>
        <div className="item" 
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
        >
        {/* right box */}
        <Box
          sx={{
            // display:"flex",
            width:"30%"
          }}
        >
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
        </Box>
        </div>
      </Button>
    )
  }
}export default withRouter(Group);