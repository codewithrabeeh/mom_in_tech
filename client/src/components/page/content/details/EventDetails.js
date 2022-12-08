import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './Details.module.css'

function EventDetails() {
    const params = useParams()
    const { eventId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [event, setEvent] = useState([])
    const [isUser, setIsUser] = useState()
    const navigate = useNavigate()

    const deleteHandler = async () => {
        try {
            const response = await fetch(`https://urchin-app-a4mge.ondigitalocean.app/event/${eventId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${isAuth}`
                }
            })

            const data = await response.json()
            if (!data.status) {
                return alert('error')
            }
            if(data.status === 'Unauthorized') {
                alert('Unauthorized to Delete')
            }
            navigate('/event')
        } catch (e) {
            alert(e.message)
        }
    }

    const fetchData = async () => {
        const response = await fetch(`https://urchin-app-a4mge.ondigitalocean.app/event/${eventId}`, {
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
                            <a href={`https://${event.link}`} target="_blank">{event.link}</a>
                            <div className='mt-3'>
                                {isUser ? <Button onClick={deleteHandler} style={{background: '#dc3545', border: 'none'}}>Delete</Button> : null}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
  
        </div>
    )
}

export default EventDetails