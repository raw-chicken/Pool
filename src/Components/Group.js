import Button from '@mui/material/Button';
import { Typography, Box, IconButton } from '@mui/material';
import React, { Component } from 'react';
import {withRouter} from '../withRouter';
import '../css/App.css';
import { getGroupInfo, addPassenger } from '../firebase/firebase';
import { getUserId, getUserName } from '../Global/UserInfo';
import DeleteIcon from '@mui/icons-material/Delete';

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
      passengers: {},
      editMode: false
    };

    this.openChat=this.openChat.bind(this);
    getGroupInfo(props.groupID, this);
  }

  toggleEditMode()
  {
    this.setState({editMode: !this.state.editMode});
  }

  joinOnClick() {
    if (this.state.count >= this.state.capacity) return;
    const username = getUserName()
    const userId = getUserId()
    addPassenger(this.state.id, username, userId)
    // this.setState({update: true})
    getGroupInfo(this.state.id, this)
  }

  openChat = (event) => {
    if (this.state.editMode)
      return;

    this.props.navigate(`/event/${this.state.eventId}/chat/${this.state.id}`)
  }

  getRider(rider) {
    if (!this.state.editMode)
    { // normal
      return rider
    }
    else
    { // editing
      return (
        <div>
          <Typography>
            { rider }
            <IconButton
              onMouseDown={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation();
                console.log("I am going to delete the passenger " + rider);
              }}
              sx = {{
                padding: 0,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Typography>
        </div>
      )
    }
  }

  getEditButton()
  {
    if (!this.state.editMode) 
    { // normal
      return (
        <Button 
          variant="outlined"
          sx={{
            color:"#77BB3F", 
            // backgroundColor:"#77BB3F",
            borderColor:"#77BB3F",
            border:1.5, 
            ':hover': {
              color:"#F7F7F6", 
              backgroundColor: '#77BB3F',
              borderColor:"#77BB3F",
              border:1.5, 
            }
          }} 
          className="btn change-btn-size"
          onClick={() => this.toggleEditMode()} 
        >
          <Typography variant="h7">Edit</Typography>
        </Button>
      )
    }
    else
    {
      return (
        <Button 
          variant="outlined"
          sx={{
            color:"#F51112", 
            // backgroundColor:"#F51112",
            borderColor:"#F51112",
            border:1.5, 
            ':hover': {
              color:"#F7F7F6", 
              backgroundColor:"#F51112",
              borderColor:"#F51112",
              border:1.5, 
            }
          }} 
          className="btn change-btn-size"
          onClick={() => this.toggleEditMode()} 
        >
          <Typography variant="h7">Edit</Typography>
        </Button>
      )
    } 
  }
  
  render() {
    let count = 0;
    let ridersDisplay = undefined;
    
    // very bad null handling
    if (this.state.passengers !== undefined && this.state.count > 1) {
      ridersDisplay = 
        Object.values(this.state.passengers).map((rider) =>
          <li  
            key={count++}
            sx={{
              margin: 0,
              textAlign: "left",
            }}
            className="change-text-size"
          >
            {this.state.update && rider !== this.state.driver && this.getRider(rider)}
            
          </li>
        );
    }


    return( 
      <Button
        variant="contained" 
        size="large"
        sx={{
          display:"flex",
          flexDirection: "row",
          color:"black", 
          backgroundColor:"#F7F7F6",
          borderRadius: 5,
          ':hover': {
            backgroundColor: '#F7F7F6',
          },
          width:"90%",
          marginBottom: 2,
          marginLeft:2,
        }} 
        className="horizontal-stack btn"
        onClick={this.openChat}
      >
        {/* left box */}
        <Box
          sx={{
            display:"flex",
            flexDirection: "column",
            width:"70%",
            textAlign: "left",
          }}
        >
          <h3 className="item">{this.state.update && this.state.driver} ({this.state.count}/{this.state.update && this.state.capacity})</h3>
          {this.state.update && 
            <ul>
              {ridersDisplay}
            </ul>
          }
        </Box>
        <div
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
        >
        {/* right box */}
          {this.getEditButton()}
          <Button 
            variant="contained" 
            sx={{
              marginTop: "15px",
              marginBottom: "15px",
              color:"#F7F7F6", 
              backgroundColor:"#77BB3F",
              ':hover': {
              backgroundColor: '#77BB3F',
              }
            }} 
            className="btn change-btn-size"
            onClick={() => this.joinOnClick()}
          >
            <Typography variant="h7">Join</Typography>
          </Button>
        </div>
      </Button>
    )
  }
}export default withRouter(Group);