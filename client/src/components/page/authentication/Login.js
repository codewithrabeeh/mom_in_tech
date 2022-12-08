import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import React, { useRef } from 'react'
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
    
    try {
      const response = await fetch('https://urchin-app-a4mge.ondigitalocean.app/login', {
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
        dispatch(authActions.userName(localStorage.getItem('username')))
        dispatch(authActions.token(localStorage.getItem('token')))
        navigate('/')
        alert('Login Successfully!')
      } else {
        alert('Failed To Authenticate!')
      }

    } catch (e) {
      alert(e.message)
    }


  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (

    <div style={{ height: '80%', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <Card className="">
        <Card.Body style={{ width: '400px' }}>

          <Card.Title className="mb-3">Log in</Card.Title>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control ref={usernameRef} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Password" />
            </Form.Group>           
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login