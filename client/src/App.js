import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { authActions } from './components/store/auth';

import classes from './App.module.css'
import NavigationBar from './components/page/header/NavigationBar';
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

  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const dispatch = useDispatch()
  // dispatch(authActions.token())

  return (
    <div className={classes.app}>
      <NavigationBar />
      <ChatBox />
      <Routes>
        {/* Main */}
        <Route path='/' index element={<Home />} />
        {/* Show List */}
        <Route path='/dashboard' element={<Blog />} />
        <Route path='/job' element={<Job />} />
        <Route path='/event' element={<Event />} />
        {/* Show Details */}
        <Route path='/blog/:blogId' element={<BlogDetails />} />
        <Route path='/job/:jobId' element={<JobDetails />} />
        <Route path='/event/:eventId' element={<EventDetails />} />
        {/* Create */}
        <Route path='/createblog' element={<CreateBlog />} />
        <Route path='/createjob' element={<CreateJob />} />
        <Route path='/createevent' element={<CreateEvent />} />
        {/* Edit */}
        <Route path='/editblog/:blogId' element={<EditBlog />} />
        {/* Authentication */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' index element={<PageNotFound/>} />



      </Routes>
    </div>
  );
}

export default App;