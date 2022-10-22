import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function StartPage() {
    return (
        <Button variant="contained" endIcon={<SendIcon />}>
        Send
        </Button>
    );
  }
  
export default StartPage;