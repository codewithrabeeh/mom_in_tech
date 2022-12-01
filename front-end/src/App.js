import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { authActions } from './components/store/auth';
import 'bootstrap/dist/css/bootstrap.min.css';


import classes from './App.module.css'
import Home from './components/page/content/Home';
import Dashboard from './components/page/content/Dashboard'
import NavigationBar from './components/page/header/NavigationBar';
import Login from './components/page/authentication/Login';
import Register from './components/page/authentication/Register';

function App() {
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const dispatch = useDispatch()
  // dispatch(authActions.token())
  const AuthRedirectElement = isAuthenticated ? <Dashboard /> : <Home />

  return (
    <div className={classes.app}>
      <NavigationBar /> 
      

      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />        
      </Routes>
    </div>
  );
}

export default App;