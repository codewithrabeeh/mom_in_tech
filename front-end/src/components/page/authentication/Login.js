import React, { useRef } from 'react'
import classes from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'
import { useNavigate, Navigate } from 'react-router-dom'


function Login() {
  const usernameRef = useRef()
  const passwordRef = useRef()

  const isAuth = useSelector(state => state.auth.token)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const response = await fetch('http://127.0.0.1:4000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await response.json()

    if (data.status) {
     
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      dispatch(authActions.token(localStorage.getItem('token')))
      navigate('/')
      alert('Login Successfully!')
    } else {
      alert('Failed To Authenticate!')
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <div className={classes.login}>
      <div className={classes.box}>
        <h2 className={classes.heading}>Login</h2>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <label>Email</label>
          <input type={classes.email} ref={usernameRef} />
          <label>Password</label>
          <input type='password' ref={passwordRef} />
          <button>Login</button>
        </form>
      </div>

    </div>
  )
}

export default Login