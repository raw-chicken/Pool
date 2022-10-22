import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import React, { Component } from 'react';
import '../css/App.css';

export default class Group extends Component {

    constructor(props) {
        super(props)
        this.state = {driver: "Driver", riders:[]};
    }

    render() {
        const ridersDisplay = this.state.riders.map((rider) =>
            <p className="item">{rider}</p>
        );

        return( 
            <div className="box p3">
                <h3 className="item">{this.state.driver}</h3>
                {ridersDisplay}
                <div className="item">
                <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                        color:"#F7F7F6", 
                        backgroundColor:"#77BB3F",
                        ':hover': {
                        backgroundColor: '#77BB3F',
                        }
                    }} 
                    className="btn"
                    >
                    <Typography
                        variant="h7"
                    >
                        Edit
                    </Typography>
                </Button>
                <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                        color:"#F7F7F6", 
                        backgroundColor:"#77BB3F",
                        ':hover': {
                        backgroundColor: '#77BB3F',
                        }
                    }} 
                    className="btn"
                    >
                    <Typography
                        variant="h7"
                    >
                        Join
                    </Typography>
                </Button>
                </div>
            </div>
        )
    }
}