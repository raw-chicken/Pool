import '../css/App.css';
import '../css/Event.css';

import React, { Component } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import Group from "../Components/Group.js"
import Header from "../Components/Header.js"
import NewGroupForm from '../Components/NewGroupForm';

import { useParams } from "react-router-dom";
import { getEvent } from '../firebase/firebase';
import { AnimatePresence, motion } from 'framer-motion';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class EventPage extends Component {
  constructor(props) {
    super(props);
    let { id } = this.props.params;
    
    this.state = {
      id: id,
      update: false,
      name: "",
      description: "",
      groups: {},
    }

    getEvent(this.state.id, this);
    
  }
  
	getAnimationProps = (i) => {
    return {
      initial: { y: -10, opacity: 0 },
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

  render() {
    let count = 0;
    let groupsDisplay = undefined;

    console.log(this.state.groups);
    // Very bad null handling
    if (this.state.groups !== undefined) {
      groupsDisplay = Object.keys(this.state.groups).map((group) =>
        <AnimatePresence key={2000 + count}>
          <motion.div key={"eventCard" + count++} {...this.getAnimationProps((count + 1) * 0.1)}>
            <Group groupID={group} eventID={this.state.id} key={1000 + count++}/>
          </motion.div>
        </AnimatePresence>
      )
    }

    return(
      <AnimatePresence>
        {this.state.update && (
          <motion.div
            key="newEventPage"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                // delay: 0.2,
              }
            }}
            exit={{ opacity: 0 }}
          >
          <Header/>

            <div className='content fill-stack'>
              <div>
                <h1> {this.state.update && this.state.name } </h1>
                <p>{ this.state.update && this.state.description } </p>
              </div>

              { groupsDisplay }
              
              <motion.div 
                key="eventNewDriver" 
                {...this.getAnimationProps((count + 4) * 0.1)}
              >
                <NewGroupForm eventID={this.state.id}/>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
}

export default withParams(EventPage);
