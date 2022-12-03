import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import parseBody from "html-react-parser";

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './BlogDetails.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';

function PostDetails() {
    const params = useParams()
    const { blogId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [blog, setBlog] = useState([])
    const [isUser, setIsUser] = useState()
    const navigate = useNavigate()

    const deleteHandler = async () => {
        const response = await fetch(`http://127.0.0.1:4000/blog/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        navigate('/dashboard')
    }

    const fetchData = async () => {        
        const response = await fetch(`http://127.0.0.1:4000/blog/${blogId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        setBlog(data)

        if(data.username === userName){            
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }

    useEffect(() => {
        try {          
            fetchData()
        } catch (e) {
            alert(e.message)
        }
    }, [userName, isAuth])

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardOne}>
                <div className={`${classes.blog} mt-4`}>
                    <Card>
                        <Card.Body>
                            <Card.Title><h2>{blog.title} {isUser}</h2></Card.Title>
                            <Card.Text>
                                {parseBody(blog.body)}
                            </Card.Text>
                            {isUser ? <Button onClick={() => {navigate(`/editblog/${blogId}`)}} variant="primary" className='me-4'>Edit</Button> : null}
                            {isUser ? <Button onClick={deleteHandler} variant="danger">Delete</Button> : null}
                            <Card.Subtitle className={`mt-2`}><box-icon className={classes.hoverHeart} name='heart'></box-icon></Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <SidePanel />
        </div>
    )
}

export default PostDetails