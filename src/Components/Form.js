import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Box, Button } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import {withRouter} from '../withRouter';
import { Stack } from '@mui/system';
import { AnimatePresence, motion } from 'framer-motion';

class Form extends React.Component {

    constructor(props) {
        super()
        this.handleSubmit=this.handleSubmit.bind(this);
    }

	state = {
        formData: {
            eventName: '',
            description: '',
            date: '',
            time: ''
        },
	}
  
	getAnimationProps = (i) => {
    return {
      initial: { y: -20, opacity: 0 },
      animate: {
        y: 0, 
        opacity: 1, 
        transition: {
          delay: i,
          duration: 0.7,
          ease: [0.6, -0.05, 0.01, 0.99],
        }
      }
    }
	}

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }


	handleSubmit = () => {
		const eventID = createEvent(this.state.formData.eventName, this.state.formData.description, this.state.formData.date, this.state.formData.time)
        this.props.navigate(`/event/${eventID}`)
	}

	render() {
        const { formData } = this.state;
		return (
      <AnimatePresence>
			<ValidatorForm
				ref="form"
				onSubmit={this.handleSubmit}
				onError={errors => console.log(errors)}
			>
				<Stack 
					spacing={2}
					justifyContent='center'
				>
          <motion.div key="formName" {...this.getAnimationProps(0.1)}>
					<TextValidator
						required
						label="Event Name"
						name="eventName"
						id="standard-basic"
						variant="standard"
						value = {formData.eventName}
						onChange={this.handleChange}
						validators={['required']}
						errorMessages={['this field is required']}
						sx={{ width: '100%' }}
					/>
          </motion.div>

          <motion.div key="formDesc" {...this.getAnimationProps(0.2)}>
					<TextValidator
						id="standard-multiline"
						label="description"
                        name="description"
						multiline
						rows={3}
						value={ formData.description }
						onChange={this.handleChange}
						sx={{ width: '100%' }}
					/>
          </motion.div>

					<Box 
						sx={{ 
							display: 'flex',
							justifyContent: 'space-around' 
						}}
					>
            <motion.div key="formDate" {...this.getAnimationProps(0.3)}>
            <TextValidator
              required
              id="date"
              name="date"
              label="Event Date"
              type="date"
              margin="normal"
              // sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={ formData.date }
              onChange={this.handleChange}
            />
            </motion.div>

            <motion.div key="formTime" {...this.getAnimationProps(0.4)}>
            <TextValidator
              required
              name="time"
              id="time"
              label="Event Time"
              type="time"
              margin="normal"
              InputLabelProps={{
              shrink: true,
              }}
              inputProps={{
              step: 60, // 5 min
              }}
              value={formData.time}
              onChange={this.handleChange}
            />
            </motion.div>
					</Box>

          <motion.div key="formButton" {...this.getAnimationProps(0.8)}>
					<Button 
						type="submit"
						variant="contained" 
						sx={{
              width: '100%',
							backgroundColor: '#77BB3F',
							':hover': {
								backgroundColor: '#77BB3F',
							}
						}}
						margin="normal"
					>
					Create Event
					</Button>
          </motion.div>
				</Stack>
			</ValidatorForm>
      </AnimatePresence>
		);
	}
}

export default withRouter(Form);
