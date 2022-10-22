import Button from '@mui/material/Button';
import '../css/App.css';
import '../css/Start.css';
import { black } from '@mui/material/colors';

function StartPage() {
    document.body.style = 'background: #77BB3F;';

    return (
        <div className="stacked">
            <img src = "pool-transparent.png" alt="logo"></img>

            <Button variant="contained" size="large"
            sx={{color:"black", backgroundColor:"white"}} className="btn">
                Create New Event
            </Button>
        </div>
    );
  }

export default StartPage;