import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/Header.js';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { Button, Grid } from '@mui/material';

function NewEventPage() {

    return (
      <Box>
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
            <TextField id="standard-basic" label="Event Name" variant="standard" />

            <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={3}
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
                // sx={{ width: 150 }}
              />
            </Box>

            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#77BB3F'
              }}
              margin="normal"
            >
              Create Event
            </Button>

          </Stack>
        </Grid>
      </Box>

    );
  }
  
export default NewEventPage;