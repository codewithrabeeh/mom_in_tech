import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './BlogDetails.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';
/* todo - delete button */
function JobDetails() {
    const params = useParams()
    const { jobId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [job, setJob] = useState([])
    const [isUser, setIsUser] = useState()
    const navigate = useNavigate()

    const deleteHandler = async () => {
        const response = await fetch(`http://127.0.0.1:4005/job/${jobId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        navigate('/job')
    }

    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:4000/job/${jobId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        setJob(data)

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
                    <Card >
                        <Card.Body>
                            <Card.Title><h2>{job.title}</h2></Card.Title>
                            <Card.Text onClick={() => { navigate(`/job/${job._id}`) }}>
                                {job.description}
                            </Card.Text>
                            <Card.Subtitle className="text-dark">Apply to</Card.Subtitle>
                            <Card.Link className="text-decoration-none text-info" href={`mailto:${job.email}`}>{job.email}</Card.Link>
                            <br />
                            <div className='mt-4'>                                                        
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

export default JobDetails