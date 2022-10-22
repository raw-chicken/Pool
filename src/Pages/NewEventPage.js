import * as React from 'react';
import Header from '../Components/Header.js';
import Form from '../Components/Form.js';
import { Grid } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

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

      <AnimatePresence>
        <motion.div
          key="newEventPage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
            {/* <div className="content"> */}
              <Form/>
            {/* </div> */}
          </Grid>
        </motion.div>
      </AnimatePresence>

    );
  }
  
export default NewEventPage;