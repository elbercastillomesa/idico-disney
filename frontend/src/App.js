import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages & Components Import
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthContextProvider } from './context/AuthContext';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className='pages'>

            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/signup'
                element={<Signup />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;