import React from 'react'
import classes from './Register.module.css'


function Register() {
  return (
    <div className={classes.register}>
       <div className={classes.box}>
        <h2 className={classes.heading}>Register</h2>
        <form className={classes.form}>
          <label>Email</label>
          <input type='email' />
          <label>Password</label>
          <input type='password' />
          <button>Login</button>
        </form>
      </div>
      
    </div>
  )
}

export default Register