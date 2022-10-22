import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import StartPage from './Pages/StartPage.js'
import Chat from './Pages/Chat.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
