import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import '../css/App.css';
import '../css/Start.css';

function StartPage() {
  document.body.style = 'background: #77BB3F;';

  return (
    
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
      <div className="stacked">
        <img src = "pool-transparent.png" alt="logo"></img>

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
      </div>
    </Grid>
  );
}

export default StartPage;