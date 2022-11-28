import React, { useEffect } from 'react'
import classes from './Navbar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../components/store/auth';

import { Link, Outlet, useNavigate } from 'react-router-dom'
const usernameLogo = 'https://img.icons8.com/material/24/null/user-male-circle--v1.png'


const username = localStorage.getItem('username')

function Navbar() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)

  useEffect(() => {
    
  }, [isAuth])

  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.clear()

    dispatch(authActions.clearToken())
    dispatch(authActions.logout())
    navigate('/')
  }

  return (
    <div>
      <div className={classes.navbar}>
        <h2 className={classes.logo}>Logo</h2>
        <input className={classes.input} placeholder='search' type='text' />
        {/* <h3 className={classes.home}><Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>Home</Link></h3> */}
        <h3 className={classes.about}><Link to='/dashboard'>About</Link></h3>
        <h3 className={classes.vent}>Vent</h3>
        {!isAuth && <h3 className={classes.login}><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link></h3>}
        {!isAuth && <h3 className={classes.register}><Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>Register</Link></h3>}
        {isAuth && <h3 className={classes.register} onClick={logoutHandler}>Logout</h3>}
        {isAuth && <h3 className={classes.profile}>{username ? username : 'Username'}<span><img src={usernameLogo} /></span></h3>}
      </div>

      <Outlet />

    </div>
  )
}

export default Navbar