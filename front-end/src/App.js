import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { authActions } from './components/store/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Pass the username through props to postDetails and compare real username and blog username then hide buttons  */

import classes from './App.module.css'
import Home from './components/page/content/Home';
import Dashboard from './components/page/content/show/Blog'
import NavigationBar from './components/page/header/NavigationBar';
import Login from './components/page/authentication/Login';
import Register from './components/page/authentication/Register';
import PostDetails from './components/page/content/PostDetails';
import BlogPost from './components/page/content/create/BlogPost';
import Job from './components/page/content/create/Job';
import Event from './components/page/content/create/Event';
 
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
        <Route path='/post/:postId' element={<PostDetails />} />        
        <Route path='/createblog' element={<BlogPost />} />        
        <Route path='/createjob' element={<Job />} />        
        <Route path='/create-event' element={<Event />} />        
      </Routes>
    </div>
  );
}

export default App;