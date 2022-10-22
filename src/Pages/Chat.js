import '../css/Chat.css';

import React, { Component } from "react";
import { database, addMessage } from "../firebase/firebase"
import { ref, onValue } from "firebase/database";

export default class Chat extends Component {
    constructor(props) {
      super(props);
      this.state = {
        chats: {},
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        console.log("did mount")
        this.setState({ readError: null, loadingChats: true });
        try {
            //TODO: Need to get the group id 
            const messages = ref(database, 'chats/group1');
            onValue(messages, (snapshot) => {
                console.log(snapshot.val())
                this.state.chats = snapshot.val()
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
        // const chatArea = this.myRef.current;
        try {
            //TODO Need to get the name and group id
          addMessage("test name", this.state.content, "group1")
            // this.setState({ content: '' });
            // chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render() {
        return (
        <div>
            <div className="chat-area">
            "In render"
            {Object.entries(this.state.chats).map(([time, message]) => {
                //TODO: Need to get the user's Name ID
                return <p className={"chat-bubble " + ("" === message.name ? "current-user" : "")} key={time}>
                {message.text}
                <br />
                </p>
            })}
            </div>
            <form className="mx-3" onSubmit={this.handleSubmit}>
            <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
            </form>
        </div>
        );
    }
}
  
  