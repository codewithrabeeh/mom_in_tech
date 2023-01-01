import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { authActions } from './components/store/auth';

import classes from './App.module.css'
import NavigationBar from './components/page/header/NavigationBar';
import Footer from './components/page/header/Footer';
import Home from './components/page/content/Home';
import Login from './components/page/authentication/Login';
import Register from './components/page/authentication/Register';
import BlogDetails from './components/page/content/details/BlogDetails';
import JobDetails from './components/page/content/details/JobDetails';
import CreateBlog from './components/page/content/create/CreateBlog';
import CreateEvent from './components/page/content/create/CreateEvent';
import CreateJob from './components/page/content/create/CreateJob'
import Job from './components/page/content/show/Job';
import Event from './components/page/content/show/Event'; 
import Blog from './components/page/content/show/Blog'
import EventDetails from './components/page/content/details/EventDetails';
import EditBlog from './components/page/content/edit/EditBlog';
import ChatBox from './components/ChatBox';
import PageNotFound from './components/errors/PageNotFound';

function App() {
  const localhost = 'http://127.0.0.1:4005'
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const dispatch = useDispatch()
  // dispatch(authActions.token())

  return (
    <div className={classes.app}>
      <NavigationBar />
      <ChatBox />
      <Routes>
        {/* Main */}
        <Route path='/' index element={<Home host={localhost} />} />
        {/* Show List */}
        <Route path='/dashboard' element={<Blog host={localhost} />} />
        <Route path='/job' element={<Job host={localhost} />} />
        <Route path='/event' element={<Event host={localhost} />} />
        {/* Show Details */}
        <Route path='/blog/:blogId' element={<BlogDetails host={localhost} />} />
        <Route path='/job/:jobId' element={<JobDetails host={localhost} />} />
        <Route path='/event/:eventId' element={<EventDetails host={localhost} />} />
        {/* Create */}
        <Route path='/createblog' element={<CreateBlog host={localhost} />} />
        <Route path='/createjob' element={<CreateJob host={localhost} />} />
        <Route path='/createevent' element={<CreateEvent host={localhost} />} />
        {/* Edit */}
        <Route path='/editblog/:blogId' element={<EditBlog host={localhost} />} />
        {/* Authentication */}
        <Route path='/login' element={<Login host={localhost} />} />
        <Route path='/register' element={<Register host={localhost} />} />
        <Route path='*' index element={<PageNotFound host={localhost} />} />
        
      </Routes>
    <Footer />

    </div>
  );
}

export default App;