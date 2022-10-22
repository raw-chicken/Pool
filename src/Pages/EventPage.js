import '../css/App.css';
import '../css/Event.css';

import React, { Component } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import Group from "../Components/Group.js"
import Header from "../Components/Header.js"

import { useParams } from "react-router-dom";

export default class EventPage extends Component {

  constructor(props) {
    super(props)
    this.state = {name: "Event Name", description: "description", groups:[]}
  }

  render() {
 // const { id } = useParams();
  //console.log("ID: ", id);
  // const groupsDisplay = this.state.groups.map((group) =>
  //   <Group />
  // )

  return( 
      <div>
      <Header/>

      <div className='content fill-stack'>
        <div>
          <h1>Event Name</h1>
          <p>description</p>
        </div>

        {/* {groupsDisplay} */}

        {/* should add a new group bc new driver on click */}
        <Button 
        variant="contained" 
        size="large"
        sx={{
          color:"#F7F7F6", 
          backgroundColor:"#77BB3F",
          borderRadius: 10,
          ':hover': {
            backgroundColor: '#77BB3F',
          }
        }} 
        className="btn"
        >
        <Typography
          variant="h7"
        >
          I'm a driver
        </Typography>
        </Button>
      </div>
      </div>
    )
  }
   // console.log(this.props.match.params.id);  
}

