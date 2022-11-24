import {Routes, Route } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import { authActions } from './components/store/auth';

import classes from './App.module.css'
import Home from './components/Home';
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  // const dispatch = useDispatch()
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // dispatch(authActions.login())
  return (
    <div className={classes.app}>      
        <Navbar />
     <Routes>
          <Route path='home' element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='login' element={<Login />} />        
          <Route path='register' element={<Register />} />        
      </Routes>
    </div>
  );
}

export default App;
 