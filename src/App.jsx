import { Routes, Route } from 'react-router-dom';
import './css/App.css'
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
