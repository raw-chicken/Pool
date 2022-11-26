import '../css/App.css';
import '../css/Event.css';

import React, { Component } from 'react';
import Group from "../Components/Group.js"
import Header from "../Components/Header.js"
import ShareLink from "../Components/ShareLink.js"
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
      loading: false,
      name: "",
      description: "",
      groups: {},
    }

    getEvent(id, this);
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

    // Very bad null handling
    if (this.state.groups !== undefined) {
      groupsDisplay = Object.keys(this.state.groups).map((group) =>
        <AnimatePresence key={2000 + count}>
          <motion.div key={"eventCard" + count++} {...this.getAnimationProps((count + 1) * 0.1)}>
            <Group groupID={group} eventID={this.state.id} key={1000 + count}/>
          </motion.div>
        </AnimatePresence>
      )
    }

    return(
      <AnimatePresence>
        <motion.div
          key="newEventPage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Header />
          <div className='content'>
            <div className="horizontal-stack">
              <h1>{ this.state.name }</h1>
              <ShareLink />
            </div>
            <p>{ this.state.description }</p>

            { groupsDisplay }
            
            <motion.div 
              key="eventNewDriver" 
              {...this.getAnimationProps((count + 4) * 0.1)}
            >
              <NewGroupForm eventID={this.state.id} parent={this}/>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }
}

export default withParams(EventPage);
