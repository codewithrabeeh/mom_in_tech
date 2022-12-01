import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    // <div>
    //   <div className={classes.navbar}>
    //     <h2 className={classes.logo}>Logo</h2>
    //     <input className={classes.input} placeholder='search' type='text' />
    //     <h3 className={classes.home}><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Home</Link></h3>
    //     {isAuth && <h3 className={classes.about}><Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Link></h3>}
    //     <h3 className={classes.vent}>Vent</h3>
    //     {!isAuth && <h3 className={classes.login}><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link></h3>}
    //     {!isAuth && <h3 className={classes.register}><Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>Register</Link></h3>}
    //     {isAuth && <h3 className={classes.register} onClick={logoutHandler}>Logout</h3>}
    //     {isAuth && <h3 className={classes.profile}>{username ? username : 'Username'}<span><img src={usernameLogo} alt='profile' /></span></h3>}
    //   </div> 
    // </div>

    <Navbar className={classes.navbarStyle}> 
      <Container fluid >
            <Navbar.Brand href="#home"><img style={{ width: '120px' }} src={usernameLogo} /></Navbar.Brand>
        <Nav>
          <Navbar.Collapse >
              <Nav.Link href="#home" className={classes.navbarColor}><Link className={classes.navbarColor} to='/'>Home</Link></Nav.Link>
              <Nav.Link href="#about" className={`ms-3`}><Link className={classes.navbarColor} to='/dashboard'>Explore</Link></Nav.Link>
              <Nav.Link href="#event" className={`ms-3 ${classes.navbarColor}`}>Events</Nav.Link>
              </Navbar.Collapse>
        </Nav>
        <Nav>
              {!isAuth && <Nav.Link href="#login" className={`pe-4 d-flex align-items-center`}><Link className={classes.navbarColor} to='/login'>Login</Link></Nav.Link>}
              
              {!isAuth && <Nav.Link  href="#Signup"><Link className={classes.signupButton} to='/register'>Signup</Link></Nav.Link>}
              
              {isAuth && <Nav.Link  href="#Signup"><div onClick={logoutHandler} className={classes.signupButton} to='/register'>Logout</div></Nav.Link>}

        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar   