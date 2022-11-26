import * as React from 'react';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editGroup, updateGroupInfo } from '../firebase/firebase';
import EditIcon from '@mui/icons-material/Edit';

export default function EditGroupForm(props) {
  const [open, setOpen] = React.useState(false);

  const [driver, setDriver] = React.useState(props.driver);
  const [model, setModel] = React.useState(props.model);
  const [plates, setPlates] = React.useState(props.plates);
  const [notes, setNotes] = React.useState(props.notes);
  const [capacity, setCapacity] = React.useState(props.capacity);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    editGroup(driver, capacity, model, plates, notes, props.groupID);
    updateGroupInfo(props.groupID, props.parent);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
          aria-label="driver info"
          size="large"
          sx={{
              padding: 0,
              color:"#77BB3F",
              ':click': {
              backgroundColor: 'white',
          },
          }}
          onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>


      <Dialog fullWidth open={open} onClose={handleCancel}>
        <DialogTitle>Update Driver Info</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}