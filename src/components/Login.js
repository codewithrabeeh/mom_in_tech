import React from 'react'
import classes from './Login.module.css'


function Login() {
  return (
    <div className={classes.login}>
       <div className={classes.box}>
        <h2 className={classes.heading}>Login</h2>
        <form className={classes.form}>
          <label>Email</label>
          <input type={classes.email} />
          <label>Password</label>
          <input type='password' />
          <button>Login</button>
        </form>
      </div>
      
    </div>
  )
}

export default Login