import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './components/store/auth';

import classes from './App.module.css'
import Home from './components/Home';
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const dispatch = useDispatch()
  // dispatch(authActions.login())
  const AuthRedirectElement = isAuthenticated ? <Dashboard /> : <Home />

  return (
    <div className={classes.app}>
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/dashboard' index element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />        
      </Routes>
    </div>
  );
}

export default App;


/* 
 <div className={classes.app}>      
        <Navbar />
     <Routes>
          <Route path='/' element={AuthRedirectElement} />          
          <Route path='login' element={<Login />} />        
          <Route path='register' element={<Register />} />        
      </Routes>
    </div>

*/