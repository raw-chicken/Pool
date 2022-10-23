import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createGroup } from '../firebase/firebase';

export default function NewGroupForm(props) {
  const [open, setOpen] = React.useState(false);

  const [driver, setDriver] = React.useState("");
  const [model, setModel] = React.useState("");
  const [plates, setPlates] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [capacity, setCapacity] = React.useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    createGroup(driver, capacity, plates, notes, props.eventID);
    window.location.reload();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
        variant="contained" 
        size ="large"
        sx={{
          width: "95%",
          marginTop: 2,
          marginBottom: 2,
          color:"#F7F7F6", 
          backgroundColor:"#77BB3F",
          ':hover': {
              backgroundColor: '#77BB3F',
          },
          borderRadius: 10,
        }} 
        className="btn"
        onClick={handleClickOpen}
      >
        <Typography
          variant="h7"
        >
          I'm a driver
        </Typography>
      </Button>
      <Dialog fullWidth open={open} onClose={handleCancel}>
        <DialogTitle>Add Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the information below to add a new driver
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="driver"
            label="Driver"
            value={driver}
            onChange={ event =>
              setDriver(event.target.value)
            }
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="car"
            label="Car Model"
            value={model}
            onChange={ event =>
              setModel(event.target.value)
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="plate"
            label="Liscence Plate"
            value={plates}
            onChange={ event =>
              setPlates(event.target.value)
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="notes"
            label="Notes"
            value={notes}
            onChange={ event =>
              setNotes(event.target.value)
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="capacity"
            label="Maximum Capacity"
            value={capacity}
            onChange={ event =>
              setCapacity(event.target.value)
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}