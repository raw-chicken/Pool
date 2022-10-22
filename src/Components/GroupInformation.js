import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Box, Button } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

class Form extends React.Component {

    state = {
        name: '',
    }

    updateName = (event) => {
        this.name = event.target.value
    }


    handleSubmit = () => {
        
    }

    render() {

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
                        label="Name"
                        name="name"
                        id="standard-basic"
                        variant="standard"
                        value = {this.name}
                        onChange={this.updateName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />

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
