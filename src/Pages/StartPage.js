import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import '../css/App.css';
import '../css/Start.css';

function StartPage() {
  document.body.style = 'background: #77BB3F;';

  return (
    <AnimatePresence>
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
        
        {/* <motion.div 
          key="mainPage"
          initial={{ opacity: 0 }}
          animate={{
            // y: 0, 
            opacity: 1, 
            // transition: {
            //   staggerChildren: .5,
            //   duration: 0.7,
            //   ease: [0.6, -0.05, 0.01, 0.99],
            // }
          }}
        > */}
        <div className="stacked">
          
          <motion.img 
            key="mainImage"
            src="pool-transparent.png"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: 0, 
              opacity: 1, 
              transition: {
                duration: 0.7,
                ease: [0.6, -0.05, 0.01, 0.99],
              }
            }}
          >
          {/* <img src = "pool-transparent.png" alt="logo"></img> */}
          </motion.img>

          <motion.div 
            key="mainButton"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: 0, 
              opacity: 1, 
              transition: {
                delay: 0.1,
                duration: 0.7,
                ease: [0.6, -0.05, 0.01, 0.99],
              }
            }}
          >
          <Button 
            component={Link} 
            to="/new" 
            variant="contained" 
            size="large"
            sx={{
              backgroundColor:"#F7F7F6",
              borderRadius: 25,
              ':hover': {
                backgroundColor: '#F7F7F6',
              }
            }} 
            className="btn"
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#444'
              }}
            >
              Start Planning
            </Typography>
          </Button>
          </motion.div>

        </div>
        {/* </motion.div> */}
      </Grid>
    </AnimatePresence>
  );
}

export default StartPage;