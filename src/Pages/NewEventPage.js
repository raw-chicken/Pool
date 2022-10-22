import * as React from 'react';
import Header from '../Components/Header.js';
import Form from '../Components/Form.js';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { Box, Button, Grid } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import '../css/Event.css';


function NewEventPage() {
    document.body.style = 'background: white';
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

    // let nameValid = false;
    // let dateValid = false;
    // let timeValid = false;

    // component={Link} 
    //           to={{ pathname: '/event', state: { foo: 'bar'} }}
    const navigate = useNavigate();
    const handleOnClick = () => {
      const eventID = createEvent(name, desc, date, time)
      navigate(`/event/${eventID}`);
    };

    const handleChange = (event) => {
      console.log("handling change")
  }

    return (

      <Box>
        
      <AnimatePresence>
        <Header/>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ 
            minHeight: '100vh',
          }}
          sx={{
            mx: 'auto'
          }}
        >
          <div className="content">
            <Form/>
          </div>
        </Grid>
        </AnimatePresence>
      </Box>

    );
  }
  
export default NewEventPage;