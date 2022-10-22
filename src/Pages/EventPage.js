import Button from '@mui/material/Button';
import '../css/App.css';

function EventPage(event) {
    return (
        <div>
            <h1>View Event</h1>
            <p>{event}</p>
        </div>
    );
  }

export default EventPage;