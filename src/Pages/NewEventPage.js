import * as React from 'react';
import Header from '../Components/Header.js';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { Box, Button, Grid } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import '../css/Event.css';


function NewEventPage() {
    document.body.style = 'background: white';
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

    // component={Link} 
    //           to={{ pathname: '/event', state: { foo: 'bar'} }}
    const navigate = useNavigate();
    const handleOnClick = () => {
      const eventID = createEvent(name, desc, date, time)
      navigate(`/event/${eventID}`);
    };

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
          <Stack 
            spacing={2}
            justifyContent='center'
          >
            <TextField
              value={ name }
              id="standard-basic"
              label="Event Name"
              variant="standard"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={3}
              value={ desc }
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              // variant="standard"
            />

            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'space-around' 
              }}
            >
              <TextField
                id="date"
                label="Event Date"
                type="date"
                margin="normal"
                // sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={ date }
                onChange={(e) => {
                    setDate(e.target.value);
                }}
              />
              <TextField
                id="time"
                label="Event Time"
                type="time"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1800, // 5 min
                }}
                value={time}
                onChange={(e) => {
                    setTime(e.target.value);
                }}
                // sx={{ width: 150 }}
              />
            </Box>

            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#77BB3F',
                ':hover': {
                  backgroundColor: '#77BB3F',
                }
              }}
              margin="normal"
              onClick={()=>handleOnClick()}
            >
              Create Event
            </Button>

          </Stack>
          </div>
        </Grid>
        </AnimatePresence>
      </Box>

    );
  }
  
export default NewEventPage;