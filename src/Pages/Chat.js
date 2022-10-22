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
            const messages = ref(database, 'chats');
            onValue(messages, (snapshot) => {
                console.log(snapshot)
                const data = snapshot.val();
                console.log(data)
                this.setState({ data });
            });
        } catch (error) {
            console.log(error)
            this.setState({ readError: error.message });
        }
    }
    componentWillUnmount() {
        console.log("unmount")
    }
    render() {
        return (
          <div>
            <div className="chats">
              {this.state.chats.map(chat => {
                return <p key={chat.timestamp}>{chat.content}</p>
              })}
            </div>
            <div>
              Login in as:
            </div>
          </div>
        );
      }
}
  
  