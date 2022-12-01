import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

import React, { useEffect } from 'react'
import classes from './NavigationBar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

import { Link, useNavigate } from 'react-router-dom'
const usernameLogo = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1669826792/blahblah_pjtgxd.png'

const username = localStorage.getItem('username')

function NavigationBar() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)

  useEffect(() => {

  }, [isAuth])

  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.clear()

    dispatch(authActions.clearToken())
    navigate('/')
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
            {isAuth && <Form.Control type="text" placeholder="Search" className={`ms-5 ${classes.navbarInput}`} />}
          </Navbar.Collapse>
        </Nav>
        <Nav>
          {!isAuth && <Nav.Link className={`pe-4 d-flex align-items-center`}><Link className={classes.navbarColor} to='/login'>Login</Link></Nav.Link>}

          {!isAuth && <Nav.Link ><Link className={classes.signupButton} to='/register'>Signup</Link></Nav.Link>}

          {isAuth && <Nav.Link ><div onClick={logoutHandler} className={classes.signupButton} to='/register'>Logout</div></Nav.Link>}

        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar   