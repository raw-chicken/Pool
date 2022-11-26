import '../css/Chat.css';
import Header from "../Components/Header.js"

import React, { Component } from "react";
import { addMessage, mountChat } from "../firebase/firebase"
import { useParams } from "react-router-dom";
import { getUserName } from '../Global/UserInfo';
import Button from '@mui/material/Button';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateGroupInfo } from '../firebase/firebase';
import InfoIcon from '@mui/icons-material/Info';
import EditGroupForm from '../Components/EditGroupForm';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Chat extends Component {
    constructor(props) {
      super(props);
      let { id } = this.props.params
      let { gid } = this.props.params
      console.log(gid);
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
        model: 'temp',
        desc: 'temp',
        passengers: {},
      };
      updateGroupInfo(this.state.groupID, this)
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
        mountChat(this);
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
        let passengers = Object.entries(this.state.passengers).map((entry) => {
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
            
            
            <div className="horizontal-stack">
                <h1>{this.state.driver}'s Carpool</h1>
                
                <IconButton
                    aria-label="driver info"
                    size="large"
                    sx={{
                        padding: 0,
                        color:"#77BB3F",
                        ':click': {
                        backgroundColor: 'white',
                    },
                    }}
                    onClick={() => this.handleClickOpen()}
                >
                  <InfoIcon />
                </IconButton>
            </div>

          <Dialog fullWidth open={this.state.setOpen} onClose={() => this.handleClose()}>
          <DialogTitle>
            <div className="horizontal-stack">
                Driver Information
                <EditGroupForm parent={this} groupID={this.state.groupID} driver={this.state.driver} model={this.state.model} plates={this.state.plate} notes={this.state.desc} capacity={this.state.capacity}/>
            </div>
          </DialogTitle>
          <DialogContent>
          <DialogContentText>
              Driver: {this.state.driver} 
          </DialogContentText>
          <DialogContentText>
              Model: {this.state.model}
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
              Passengers: <br></br> {passengers}
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
            
            <form className="mx-3 horizontal-stack" onSubmit={this.handleSubmit}>
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
                <Typography variant="h7"> Send </Typography>
            </Button>
            </form>
            </div>
        </div>
        );
    }
}
  

export default withParams(Chat);
  