import * as React from 'react';
import Header from '../Components/Header.js';
import Form from '../Components/Form.js';
import { Grid } from '@mui/material';
import { AnimatePresence, motion } from "framer-motion";

import '../css/Event.css';


function NewEventPage() {
    document.body.style = 'background: white';
    
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
            <div className="content">
              <Form/>
            </div>
          </Grid>
        </motion.div>
      </AnimatePresence>

    );
  }
  
export default NewEventPage;