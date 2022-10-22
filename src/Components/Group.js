import Button from '@mui/material/Button';
import '../css/App.css';
import React, { Component } from 'react';

export default class Group extends Component {

    state = {
        driver: "",
        riders: []
      }

    render() { 
        return( 
            <div>
            <h3>{this.state.driver}</h3>
            </div>
        )
    }
}