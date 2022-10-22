import { Grid } from '@mui/material';
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
                        color:"black", 
                        backgroundColor:"#F7F7F6",
                        ':hover': {
                            backgroundColor: '#F7F7F6',
                        }
                    }} 
                    className="btn"
                >
                    Create New Event
                </Button>
            </div>
        </Grid>
    );
  }

export default StartPage;