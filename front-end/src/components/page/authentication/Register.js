import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import React, { useRef } from 'react'
// import classes from './Register.module.css'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

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
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        dispatch(authActions.token(localStorage.getItem('token')))
        navigate('/')

      } else {
        alert('Failed to Authenticate')
      }

    } catch (e) {
      alert('Error Occured While Authenticating!' + e.message)
    }

  }


  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    // <div className={classes.register}>
    //   <div className={classes.box}>
    //     <h2 className={classes.heading}>Register</h2>
    //     <form onSubmit={onSubmitHandler} className={classes.form}>
    //       <label>Username</label>
    //       <input
    //         type='text'
    //         id='username'
    //         label='username'
    //         ref={usernameRef}
    //       />
    //       <label>Email</label>
    //       <input
    //         type='email'
    //         id='email'
    //         label='email'
    //         ref={emailRef} />
    //       <label>Password</label>
    //       <input
    //         type='password'
    //         id='password'
    //         label='password'
    //         ref={passwordRef}
    //       />
    //       <button>Register</button>
    //     </form>
    //   </div>

    // </div>

    <div style={{ height: '80%', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <Card className="">
        <Card.Body style={{ width: '400px' }}>

          <Card.Title className="mb-3">Register</Card.Title>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control ref={usernameRef} type="username" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Register