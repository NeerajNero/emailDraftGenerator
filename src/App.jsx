import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import InfoPage from './pages/InfoPage';
function App() {
  
  return (
    <><Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/Apps' element={<InfoPage />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
