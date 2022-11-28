import React, { useRef } from 'react'
import classes from './Register.module.css'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../components/store/auth';

function Register() {

  const dispatch = useDispatch()
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const isAuth = useSelector(state => state.auth.token)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:4000/register', {
        method: 'POST',
        body: JSON.stringify({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (data.status) {
        localStorage.setItem('token', 'secrettoken')
        localStorage.setItem('username', data.username)
        dispatch(authActions.token(localStorage.getItem('token')))
        navigate('/')

      } else {
        alert('Failed to Authenticate')
      }

    } catch (e) {
      console.log('Error Occured')
    }

  }


  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <div className={classes.register}>
      <div className={classes.box}>
        <h2 className={classes.heading}>Register</h2>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <label>Username</label>
          <input
            type='text'
            id='username'
            label='username'
            ref={usernameRef}
          />
          <label>Email</label>
          <input
            type='email'
            id='email'
            label='email'
            ref={emailRef} />
          <label>Password</label>
          <input
            type='password'
            id='password'
            label='password'
            ref={passwordRef}
          />
          <button>Register</button>
        </form>
      </div>

    </div>
  )
}

export default Register