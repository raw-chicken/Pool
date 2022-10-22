import '../css/App.css';
import '../css/Event.css';

import React, { Component } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import Group from "../Components/Group.js"
import Header from "../Components/Header.js"

export default class EventPage extends Component {

  //can pass things in
  constructor(props) {
    super(props);
    // let { id } = useParams();
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { name: "Event Name", description: "event description", groups:["name"] };
  }

  render() { 
    const groupsDisplay = this.state.groups.map((group) =>
      <Group />
    );


    console.log(this.props.match.params.id);
    
    return( 
      <div>
        <Header/>

        <div className='content fill-stack'>
            <div>
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
            </div>

            {groupsDisplay}

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
}

