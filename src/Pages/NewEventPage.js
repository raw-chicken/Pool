import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/Header.js';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import { AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';


function NewEventPage() {
    document.body.style = 'background: white';
    // const [name, description, date, time] = React.useState("1","2","3","4");
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

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
          <Stack 
            spacing={2}
            width='350px'
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
              component={Link} 
              to="/event"
              onClick={()=>createEvent(name, desc, date, time)}
            >
              Create Event
            </Button>

          </Stack>
        </Grid>
        </AnimatePresence>
      </Box>

    );
  }
  
export default NewEventPage;