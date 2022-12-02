import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './BlogPost.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';

function CreatePost() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const titleRef = useRef()
    const bodyRef = useRef()

    const [value, setValue] = useState()

    const createPostHandler = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4000/blog', {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    body: bodyRef.current.value,
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })
    
            const data = await response.json()
    
            alert('Successfully Created a Post')
            navigate('/dashboard')
    
        } catch (e) {
            alert('Failed to Create Post')
        }    
    }
    const cancelHandler = () => {
        navigate('/dashboard')
    }

    return (

        <div className={classes.dashboard}>
            {console.log('rerendered')}
            <div className={classes.dashboardOne}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">               
                </div>
                <div className={`${classes.titleDiv} w-75`}>
            <Form.Control
                ref={titleRef}
                placeholder="Title"
                type="text"
                id="createPost"
                aria-describedby="createapost"
                className={`${classes.inputMain} w-75 mt-3`}
            />
            <Form.Group className="my-3 w-75" controlId="exampleForm.ControlTextarea1">
                <Form.Control ref={bodyRef} as="textarea" placeholder='Body' rows={10} cols={58} />
            </Form.Group>
            <div className="d-flex mb-4">
                <Button onClick={createPostHandler} variant="success" className='me-5'>Create Post</Button>
                <Button onClick={cancelHandler} variant="danger" className=''>Cancel</Button>
                {/* Add onclick handlers to buttons */}
            </div>
        </div>
            </div>
            <SidePanel />
        </div>
    )
}

export default CreatePost 