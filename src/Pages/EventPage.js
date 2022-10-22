import '../css/App.css';
import '../css/Event.css';

import React, { Component } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import Group from "../Components/Group.js"
import Header from "../Components/Header.js"

import { useParams } from "react-router-dom";
import { getEvent } from '../firebase/firebase';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class EventPage extends Component {

  constructor(props) {
    super(props);
    let { id } = this.props.params;
    
    this.state = {
      id: id,
      update: false,
      name: "",
      description: "",
      groups: {},
    }

    getEvent(this.state.id, this);
    
  }

  render() {
    let count = 0;
    const groupsDisplay = Object.keys(this.state.groups).map((group) =>
      <Group groupID={group} key={count++}/>
    )

    return( 
      <div>
        <Header/>

          <div className='content fill-stack'>
            <div>
              <h1> {this.state.update && this.state.name } </h1>
              <p>{ this.state.update && this.state.description } </p>
            </div>

            { groupsDisplay }

            {/* should add a new group bc new driver on click */}
            <Button 
            variant="contained" 
            size      ="large"
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

export default withParams(EventPage);
