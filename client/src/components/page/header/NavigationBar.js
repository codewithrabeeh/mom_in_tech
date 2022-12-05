import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import React, { useEffect, useState } from 'react'
import classes from './NavigationBar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

import { Link, useNavigate, useParams } from 'react-router-dom'
const usernameLogo = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1669826792/blahblah_pjtgxd.png'

function NavigationBar() { 
  const [path, setPath ] = useState('')
  const winPath = window.location.pathname

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)
  const userName = useSelector(state => state.auth.username)
  const [text, setText] = useState('')
  const [fetchResult, setFetchResult] = useState([])
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(authActions.clearToken())
    navigate('/')
  }

  useEffect(() => {
    fetchData(text)      
  }, [text])

  useEffect(() => {
    if(winPath === '/dashboard' || winPath.includes("/blog/") || winPath.includes("/createblog") || winPath.includes("/editblog/")){
      setPath('blog')
    } else if (winPath === '/job' || winPath.includes("/job/") || winPath.includes("/createjob")){
      setPath('job')
    } else if(winPath === '/event' || winPath.includes("/event/") || winPath.includes("/createevent")){
      setPath('event')
    } else {
      setPath('')
    }
  }, [window.location.pathname])

  async function fetchData(text){   
    if(text){ 
      const response = await fetch(`http://127.0.0.1:4005/search${path}?title=${text}`)
      console.log(path)
      const data = await response.json()
      setFetchResult(data)
    }
  } 

  return (

    <Navbar className={classes.navbarStyle}>
      <Container fluid >
        <Navbar.Brand ><img style={{ width: '120px' }} src={usernameLogo} /></Navbar.Brand>
        <Nav>
          <Navbar.Collapse >
            <Link className={classes.navbarColor} to='/'>Home</Link>
            <Link className={`ms-3 ${classes.navbarColor}`} to='/dashboard'>Explore</Link>
            {!isAuth && <Nav.Link href="#event" className={`ms-2 ${classes.navbarColor}`}>Events</Nav.Link>}
            
            {path && <div className='ms-4' style={{ width: 300 }}>
              <ReactSearchAutocomplete
                items={fetchResult}
                maxResults='4'
                placeholder={'Search ' + path + 's'} 
                onSearch={(str, res) => {setText(str)}}
                onSelect={(item) => {navigate(`/${path}/${item.id}`)}}
              />
            </div>}

          </Navbar.Collapse>
        </Nav>
        <Nav>
          {!isAuth && <Nav.Link className={`pe-4 d-flex align-items-center`}><Link className={classes.navbarColor} to='/login'>Login</Link></Nav.Link>}

          {!isAuth && <Nav.Link ><Link className={classes.signupButton} to='/register'>Signup</Link></Nav.Link>}

          {isAuth && <Nav.Link><h3>{userName}</h3></Nav.Link>}

          {isAuth && <Nav.Link ><div onClick={logoutHandler} className={classes.signupButton} to='/register'>Logout</div></Nav.Link>}

        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar   