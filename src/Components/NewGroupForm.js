import '../css/Form.css';

import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/system';
import { createGroup } from '../firebase/firebase';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

  const handleSubmit = () => {
    setOpen(false);
    createGroup(driver, capacity, model, plates, notes, props.eventID);
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
          <DialogContentText className="field">
            Please fill in the information below to add a new driver
          </DialogContentText>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
          >
            <Stack 
              spacing={2}
              justifyContent='center'
            >
              <TextValidator
                required
                label="Driver"
                id="driver"
                variant="standard"
                className="field"
                value = {driver}
                onChange={ event =>
                  setDriver(event.target.value)
                }
                validators={['required']}
                errorMessages={['this field is required']}
                sx={{ width: '100%' }}
              />
              <TextValidator
                label="Car Model"
                name="carModel"
                id="driver"
                variant="standard"
                className="field"
                value = {model}
                onChange={ event =>
                  setModel(event.target.value)
                }
                sx={{ width: '100%' }}
              />
              <TextValidator
                label="License Plate"
                name="licensePlate"
                id="licensePlate"
                variant="standard"
                className="field-2"
                value = {plates}
                onChange={ event =>
                  setPlates(event.target.value)
                }
                sx={{ width: '100%' }}
              />
              <TextValidator
                label="Description"
                name="description"
                id="description"
                // variant="standard"
                className="field"
                multiline
                value = {notes}
                rows={3}
                onChange={ event =>
                  setNotes(event.target.value)
                }
                sx={{ width: '100%' }}
              />
              <TextValidator
                label="Maximum Capacity"
                name="capacity"
                id="capacity"
                variant="standard"
                className="field"
                value = {capacity}
                onChange={ event =>
                  setCapacity(event.target.value)
                }
                sx={{ width: '40%' }}
              />
            </Stack>
            
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}