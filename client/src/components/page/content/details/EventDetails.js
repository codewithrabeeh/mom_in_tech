import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './BlogDetails.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';

function EventDetails() {
    const params = useParams()
    const { eventId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [event, setEvent] = useState([])
    const [isUser, setIsUser] = useState()
    const navigate = useNavigate()

    const deleteHandler = async () => {
        const response = await fetch(`http://127.0.0.1:4005/job/${eventId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        navigate('/event')
    }

    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:4000/event/${eventId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        setEvent(data)

        if (data.username === userName) {
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
                            <Card.Title><h2>{event.title}</h2></Card.Title>
                            <Card.Text>
                                {event.description}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">Location <p className='text-dark'>{event.location}</p></Card.Subtitle>
                            <Card.Link className='text-warning text-decoration-none' href={event.link}>{event.link}</Card.Link>
                            <div className='mt-3'>
                                {isUser ? <Button onClick={deleteHandler} variant="danger">Delete</Button> : null}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <SidePanel />
        </div>
    )
}

export default EventDetails