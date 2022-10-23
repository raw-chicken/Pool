import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewGroupForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //create the group

  };

  return (
    <div>
      <Button 
            variant="contained" 
            size ="large"
            sx={{
            width: "100%",
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
      <Dialog fullWidth open={open} onClose={handleClose}>
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
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="car"
            label="Car Model"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="plate"
            label="Liscence Plate"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="notes"
            label="Notes"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}