import '../css/App.css';
import React, { Component } from 'react';

export default class EventPage extends Component {

    state = {
        name: "Event Name",
        description: "yolo"
      }

    render() { 
        return( 
            <div>
            <h1>{this.state.name}</h1>
            <p>{this.state.description}</p>
            </div>
        )
    }

    load_event(id) {
        //query the id and update state
    }
}
