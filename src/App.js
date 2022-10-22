import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './css/App.css';

import StartPage from './Pages/StartPage.js'
import NewEventPage from './Pages/NewEventPage.js'
import EventPage from './Pages/EventPage.js'
import Chat from './Pages/Chat.js';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  return (
    <AnimatePresence>
      <motion.div 
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        <Router>
          <Routes>
            <Route exact path='/' element={<StartPage />} />
            <Route path='/new' element={<NewEventPage />} />
            {/* <Route path='/event' element={<EventPage />} /> */}
            <Route path='/event/:id' element={<EventPage />} />
            <Route exact path='/event/:id/chat/:gid' element={<Chat />} />
          </Routes>
        </Router>
      </motion.div> 
    </AnimatePresence>
  );
}

export default App;
