import React from 'react'
import classes from './Navbar.module.css'

import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {
  // const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  return (
    <div>
    <div className={classes.navbar}>
        <h2 className={classes.logo}>Logo</h2>
        <input className={classes.input} placeholder='search' type='text' />
        <h3 className={classes.home}><Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>Home</Link></h3>
        <h3 className={classes.about}>About</h3>
        <h3 className={classes.vent}>Vent</h3>
        {!isAuth && <h3 className={classes.login}><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link></h3>}        
        {!isAuth && <h3 className={classes.register}><Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>Register</Link></h3>}
        {isAuth && <h3 className={classes.register}>Logout</h3>}
        <h3 className={classes.profile}>{isAuth.username ? isAuth.username : 'Username'}<span><img src="https://img.icons8.com/material/24/null/user-male-circle--v1.png"/></span></h3>
    </div>
    {/* <div className='outlet'>

    <Outlet />
    </div> */}
    </div>
  )
} 

export default Navbar