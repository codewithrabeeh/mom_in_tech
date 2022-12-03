import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './CreateBlog.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';

function Job() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.token)
    const titleRef = useRef()
    const descriptionRef = useRef()
    const emailRef = useRef()
    const userName = useSelector(state => state.auth.username)


    const createPostHandler = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4000/job', {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    email: emailRef.current.value,
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })
    
            const data = await response.json()
    
            alert('Successfully Created a Post')
            navigate('/job')
    
        } catch (e) {
            alert('Failed to Create Post')
        }    
    }
    
    const cancelHandler = () => {
        navigate('/job')
    }

    return (

        <div className={`${classes.dashboard}`}>            
            <div className={classes.dashboardOne}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">               
                </div>
                <div className={`${classes.titleDiv} w-75`}>
            <Form.Control
                ref={titleRef}
                placeholder="Title"
                type="text"
                id="email"
                aria-describedby="createapost"
                className={`${classes.inputMain} w-75 mt-3`}
            />

            <Form.Group className="my-3 w-75" controlId="exampleForm.ControlTextarea1">
                <Form.Control ref={descriptionRef} as="textarea" placeholder='Description' rows={2} cols={58} />
            </Form.Group>

            <Form.Control
                ref={emailRef}
                placeholder="Email"
                type="email"
                id="email"
                aria-describedby="createapost"
                className={`${classes.inputMain} w-75 `}
            />

            <div className="d-flex mb-4 mt-4">
                <Button onClick={createPostHandler} variant="success" className='me-5'>Create Job</Button>
                <Button onClick={cancelHandler} variant="danger" className=''>Cancel</Button>                
            </div>
        </div>
            </div>
            <SidePanel />
        </div>
    )
}

export default Job 