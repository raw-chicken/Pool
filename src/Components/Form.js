import React from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Box, Button } from '@mui/material';
import { createEvent } from '../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import { AnimatePresence, motion } from 'framer-motion';


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


	handleSubmit = () => {
		const eventID = createEvent(this.name, this.description, this.date, this.time)
		const navigate = useNavigate();
		navigate(`/event/${eventID}`);
	}

	render() {

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
						name="name"
						id="standard-basic"
						variant="standard"
						value = {this.name}
						onChange={this.updateName}
						validators={['required']}
						errorMessages={['this field is required']}
						sx={{ width: '100%' }}
					/>
          </motion.div>

          <motion.div key="formDesc" {...this.getAnimationProps(0.2)}>
					<TextValidator
						id="standard-multiline"
						label="Description"
						multiline
						rows={3}
						value={ this.description }
						onChange={this.updateDesc}
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
            </motion.div>

            <motion.div key="formTime" {...this.getAnimationProps(0.4)}>
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
              step: 60, // 5 min
              }}
              value={this.time}
              onChange={this.updateTime}
              // sx={{ width: 150 }}
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

export default Form;
