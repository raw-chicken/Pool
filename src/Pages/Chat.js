import '../css/Chat.css';
import Header from "../Components/Header.js"

import React, { Component } from "react";
import { database, addMessage } from "../firebase/firebase"
import { ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import { getUserName } from '../Global/UserInfo';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getGroupInfo } from '../firebase/firebase';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Chat extends Component {
    constructor(props) {
      super(props);
      let { id } = this.props.params
      let { gid } = this.props.params
      let { name } = this.props.params
      this.state = {
        update: false,
        chats: {},
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false,
        infoVisible: false,
        setOpen: false,
        eventID: id,
        groupID: gid,
        driver: name,
        desc: 'temp',
        passengers: {},
      };
      getGroupInfo(this.state.groupID, this)
      this.myRef = React.createRef();
      
    //   this.handleClose = this.handleClose.bind(this)
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    //   this.handleClickOpen = this.handleClickOpen(this); 
      
    }

    handleClickOpen() {
        this.setState({setOpen: true})
    };
    
    handleClose() {
        this.setState({setOpen: false})
    };

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async componentDidMount() {
        try {
            const messages = ref(database, 'chats/' + this.state.groupID);
            onValue(messages, (snapshot) => {
                this.state.chats = snapshot.val() === null ? {} : snapshot.val()
            });
        } catch (error) {
            console.log(error)
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const chatArea = this.myRef.current;
        try {
            //TODO Need to get the name and group id
            const username = getUserName()
            addMessage(username, this.state.content, this.state.groupID)
            this.setState({ content: '' });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render() {
        let count2 = 1000;
        let temp = Object.entries(this.state.passengers).map((entry) => {
            let rider = entry[1];
            return <li  key={count2++}
                sx={{
                    margin: 0,
                    textAlign: "left",
                }}
                className="change-text-size">
                {rider}
                </li>
        });
        return (
        <div>
            <Header />
            <div className="content">
            <h1>{this.state.driver}'s Carpool</h1>

        <Button 
        variant="contained" 
        size ="large"
        sx={{
          width: "95%",
          marginTop: 2,
          marginBottom: 2,
          color:"#F7F7F6", 
          backgroundColor:"#77BB3F",
          ':hover': {
              backgroundColor: '#77BB3F',
          },
          borderRadius: 10,
        }} 
            className="btn"
            onClick={() => this.handleClickOpen()}>
            <Typography variant="h7">
            View Driver Information
            </Typography>
        </Button>

          <Dialog fullWidth open={this.state.setOpen} onClose={() => this.handleClose()}>
          <DialogTitle>Driver Information</DialogTitle>
          <DialogContent>
          <DialogContentText>
              Driver: {this.state.driver} 
          </DialogContentText>
          <DialogContentText>
              License Plate: {this.state.plate}
          </DialogContentText>
          <DialogContentText>
              Capacity: {this.state.capacity}
          </DialogContentText>
          <DialogContentText>
              Description: {this.state.desc}
          </DialogContentText>
          <DialogContentText>
              Passengers: <br></br> {temp}
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={() => this.handleClose()}>Done</Button>
          </DialogActions>
          </Dialog>
            
            
            <div className="chat-area">
            {Object.entries(this.state.chats).map(([time, message]) => {
              //TODO: Need to get the user's Name ID
              return <p className={"chat-bubble " + (getUserName() === message.name ? "current-user" : "")} key={time}>
              {message.text}
              <br />
              <span className="chat-time float-right">{message.name}</span>
              </p>
            })}
            </div>
            
            <form className="mx-3" onSubmit={this.handleSubmit}>
            <input type="text" className="form-control input" name="content" onChange={this.handleChange} value={this.state.content} ></input>
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <Button 
            type="submit"
            variant="contained" 
            size ="small"
            sx={{
            marginTop: 2,
            marginBottom: 2,
            color:"#F7F7F6", 
            backgroundColor:"#77BB3F",
            ':hover': {
                backgroundColor: '#77BB3F',
            },
            borderRadius: 10,
            }} 
            className="btn btn-submit"
        >
            <Typography
            variant="h7"
            >
            Send
            </Typography>
        </Button>
            </form>
            </div>
        </div>
        );
    }
}
  

export default withParams(Chat);
  