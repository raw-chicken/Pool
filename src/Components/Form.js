import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Box, Button } from '@mui/material';
import { ThirtyFpsSelectSharp } from '@mui/icons-material';
import { createEvent } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

class Form extends React.Component {

    state = {
        name: '',
        description: '',
        date: '',
        time: ''
    }

    updateName = (event) => {
        this.name = event.target.value
    }

    updateDesc = (event) => {
        this.description = event.target.value
    }

    updateDate = (event) => {
        this.date = event.target.value
    }

    updateTime = (event) => {
        this.time = event.target.value
    }


    handleSubmit = () => {
        const eventID = createEvent(this.name, this.description, this.date, this.time)
        const navigate = useNavigate();
        navigate(`/event/${eventID}`);
    }

    render() {
        // const [name, setName] = React.useState("");
        // const [desc, setDesc] = React.useState("");
        // const [date, setDate] = React.useState("");
        // const [time, setTime] = React.useState("");

        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <Stack 
                    spacing={2}
                    justifyContent='center'
                >
                    <TextValidator
                        required
                        label="Event Name"
                        name="name"
                        id="standard-basic"
                        variant="standard"
                        value = {this.name}
                        onChange={this.updateName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />

                    <TextValidator
                        id="standard-multiline"
                        label="Description"
                        multiline
                        rows={3}
                        value={ this.description }
                        onChange={this.updateDesc}
                        // variant="standard"
                    />

                    <Box 
                    sx={{ 
                        display: 'flex',
                        justifyContent: 'space-around' 
                    }}
                    >
                    <TextValidator
                        required
                        id="date"
                        label="Event Date"
                        type="date"
                        margin="normal"
                        // sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={ this.date }
                        onChange={this.updateDate}
                    />
                    <TextValidator
                        required
                        id="time"
                        label="Event Time"
                        type="time"
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 1800, // 5 min
                        }}
                        value={this.time}
                        onChange={this.updateTime}
                        // sx={{ width: 150 }}
                    />
                    </Box>

                    <Button 
                    type="submit"
                    variant="contained" 
                    sx={{
                        backgroundColor: '#77BB3F',
                        ':hover': {
                        backgroundColor: '#77BB3F',
                        }
                    }}
                    margin="normal"
                    >
                    Create Event
                    </Button>
                </Stack>
            </ValidatorForm>
        );
    }
}

export default Form;
