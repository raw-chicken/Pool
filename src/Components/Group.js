import Button from '@mui/material/Button';
import '../css/App.css';
import React, { Component } from 'react';

export default class Group extends Component {
    constructor(props) {
        super(props);
       // this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { driver: "Driver", riders: [] };
    }

    render() { 
        return( 
            <div>
            <h3>{this.state.driver}</h3>
            </div>
        )
    }
}