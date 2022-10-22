import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './css/App.css';

import StartPage from './Pages/StartPage.js'
import NewEventPage from './Pages/NewEventPage.js'
import EventPage from './Pages/EventPage.js'
import Chat from './Pages/Chat.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<StartPage />} />
        <Route path='/new' element={<NewEventPage />} />
        <Route path='/event' element={<EventPage />} />
        <Route exact path='/chat' element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
