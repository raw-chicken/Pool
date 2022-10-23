import '../css/Chat.css';
import Header from "../Components/Header.js"

import React, { Component } from "react";
import { database, addMessage } from "../firebase/firebase"
import { ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import { getUserName } from '../Global/UserInfo';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Chat extends Component {
    constructor(props) {
      super(props);
      let { id } = this.props.params
      this.state = {
        chats: {},
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false,
        groupId: id
      };
      this.myRef = React.createRef();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    async componentDidMount() {
        console.log("did mount")
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
            const messages = ref(database, 'chats/' + this.state.groupId);
            onValue(messages, (snapshot) => {
                // console.log(snapshot.val())
                this.state.chats = snapshot.val() === null ? {} : snapshot.val()
                this.setState({ readError: null, loadingChats: false });
            });
        } catch (error) {
            console.log(error)
            this.setState({ readError: error.message, loadingChats: false });
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            //TODO Need to get the name and group id
            console.log("Submit clicked")
            const username = getUserName()
            console.log(username)
            addMessage(username, this.state.content, this.state.groupId)
            this.setState({ content: '' });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render() {
        return (
        <div>
            <Header />
            <div className="content">
            <h1>Chat</h1>
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
            <input type="text" className="form-control" name="content" onChange={this.handleChange} value={this.state.content} ></input>
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
  