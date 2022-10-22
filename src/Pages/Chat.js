import '../css/Chat.css';

import React, { Component } from "react";
import { database } from "../firebase/firebase"
import { ref, onValue } from "firebase/database";

export default class Chat extends Component {
    constructor(props) {
      super(props);
      this.state = {
        chats: [],
        content: '',
        readError: null,
        writeError: null
      };
    }
    async componentDidMount() {
        console.log("did mount")
        this.setState({ readError: null });
        try {
            // console.log(otherDatabase)
            // otherDatabase.ref("chats").on("value", snapshot => {
            // console.log("chat updated")
            // let chats = [];
            // snapshot.forEach((snap) => {
            //     chats.push(snap.val());
            // });
            const messages = ref(database, 'chats/group1');
            onValue(messages, (snapshot) => {
                // let messages = [];
                console.log(snapshot.val())
                // snapshot.forEach((snap) => {
                //     // console.log(snap.val())
                //     messages.push(snap.val());
                // })
                this.setState( {chats: snapshot.val()} );
                // console.log(this.state.chats)
            });
        } catch (error) {
            console.log(error)
            this.setState({ readError: error.message });
        }
    }
render() {
    return (
      <div>
        <div className="chat-area">
          {/* loading indicator */}
          {/* {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""} */}
          {/* chat area */}
          {/* {console.log(Object.entries(this.state.chats))    } */}
          "In render"
          {Object.entries(this.state.chats).map(([messageKey, message]) => {
            return <p className={"chat-bubble"} key={messageKey}>
              {message}
              <br />
            </p>
          })}
        </div>
        {/* <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
        </form>
        <div className="py-5 mx-3">
          Login in as: <strong className="text-info">{this.state.user.email}</strong>
        </div> */}
      </div>
    );
  }
}
  
  