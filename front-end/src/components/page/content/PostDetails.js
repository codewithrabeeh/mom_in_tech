import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './Dashboard.module.css'
import { authActions } from '../../store/auth'
import SidePanel from './SidePanel';

function PostDetails(props) {
    const params = useParams()
    const { postId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [blog, setBlog] = useState([])
    const [isUser, setIsUser] = useState()
    const navigate = useNavigate()

    const deleteHandler = async () => {
        const response = await fetch(`http://127.0.0.1:4000/blog/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        navigate('/dashboard')
    }

    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:4000/blog/${postId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${isAuth}`
                }
            }).then((res) => res.json()).then((data) => {                
                setBlog(data)               
            })
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
                            <Card.Title><h2>{blog.title}</h2></Card.Title> 
                            <Card.Text>
                               {blog.body}
                            </Card.Text>                            
                            {blog.username === userName ? <Button variant="primary" className='me-4'>Edit</Button> : null}
                            {blog.username === userName ? <Button onClick={deleteHandler} variant="danger">Delete</Button> : null}
                            <Card.Subtitle className='mt-2'><box-icon name='heart'></box-icon></Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>

            </div>
            <SidePanel />
        </div>
    )
}

export default PostDetails