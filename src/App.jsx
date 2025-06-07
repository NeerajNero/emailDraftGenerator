import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import InfoPage from './pages/InfoPage';
import OnholdTicketsNotes from './pages/OnholdTicketsNotes';
import AutoSubmitForm from './pages/Gform';
function App() {
  
  return (
    <><Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/Apps' element={<InfoPage />}/>
        <Route path='/onhold-notes' element={<OnholdTicketsNotes />} />
        <Route path='/Gform' element={<AutoSubmitForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
