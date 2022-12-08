import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import classes from './CreateEvent.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';


/* clear the event, job, blog */

function Event() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.token)
    const titleRef = useRef()
    const descriptionRef = useRef()
    const locationRef = useRef()
    const linkRef = useRef()
    const userName = useSelector(state => state.auth.username)


    const createPostHandler = async () => {
        try {          
            const response = await fetch('http://127.0.0.1:4005/event', {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    location: locationRef.current.value,
                    link: linkRef.current.value,
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })
            
            const data = await response.json()        
            
            alert('Successfully Created a Post')
            navigate('/event')

        } catch (e) {
            alert('Failed to Create Post')
        }
    }
    const cancelHandler = () => {
        navigate('/event')
    }

    if(!isAuth) {
        return <Navigate to='/event' />
    }

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-4`}>
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
                        ref={locationRef}
                        placeholder="Location"
                        type="text"
                        id="location"
                        aria-describedby="createaevent"
                        className={`${classes.inputMain} w-75 `}
                    />

                    <Form.Control
                        ref={linkRef}
                        placeholder="Link"
                        type="url"
                        id="link"
                        aria-describedby="createaevent"
                        className={`${classes.inputMain} w-75 mt-3`}
                    />

                    <div className="d-flex mb-4 mt-4">
                        <Button onClick={createPostHandler} variant="success" className='me-5'>Create Event</Button>
                        <Button onClick={cancelHandler} variant="danger" className=''>Cancel</Button>
                        
                    </div>
                </div>
            </div>
            <SidePanel />
        </div>
    )
}

export default Event 