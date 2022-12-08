import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import classes from './CreateBlog.module.css'

function CreatePost() {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)    
    const titleRef = useRef()
    const [body, setBody] = useState('')
    const [value, setValue] = useState()

    const createPostHandler = async () => {
        try {                        
            const response = await fetch('https://urchin-app-a4mge.ondigitalocean.app/blog', {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    body: body, 
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
            alert('Failed to Create Post' + e.message)
        }
    }
    const cancelHandler = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
    titleRef.current && titleRef.current.focus()
    }, [])

    if(!isAuth){
        return <Navigate to='/dashboard' />
    }

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-5 border-rounded`}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">
                </div>
                <div className={`${classes.titleDiv} w-75`}>
                    <Form.Control                        
                        ref={titleRef}
                        placeholder="Title"
                        type="text"
                        id="createPost"
                        aria-describedby="createapost"
                        style={{boxShadow: 'none'}}
                        className={`${classes.inputMain} w-75 mt-3`}
                    />
                    <div className='w-75 mt-2 mb-4'>
                    
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    // onReady={ editor => {                    
                    // } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setBody(data)
                    } }
                />
                    </div>

                    <div className="d-flex mb-4">
                        <Button onClick={createPostHandler} className='me-5' style={{backgroundColor: 'rgb(128, 204, 200)', border: 'none'}}>Create Post</Button>
                        <Button onClick={cancelHandler}  style={{backgroundColor: 'rgb(220, 53, 69)', border: 'none'}}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost 