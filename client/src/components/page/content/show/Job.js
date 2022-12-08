import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './Blog.module.css'
import { authActions } from '../../../store/auth'

function Job() {

    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const [blogList, setBlogList] = useState([])

    const fetchData = async () => {

        const response = await fetch('http://127.0.0.1:4005/job', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        setBlogList(data.post)

        if (data.status === 'Unauthorized') {
            return dispatch(authActions.clearToken())
        }

        if (!data.status) {
            alert('An Error Occured While Fetching')
        }

    }

    useEffect(() => {

        fetchData()

    }, [isAuth])


    return (

        <div className={classes.dashboard}>

            <div className={classes.dashboardOne}>

                {isAuth && <div className={`${classes.inputDiv} mt-4`}>
                    <Form.Control
                        onClick={() => { navigate('/createjob') }}
                        placeholder="Create a job"
                        type="text"
                        id="createPost"
                        aria-describedby="createapost"
                        className={classes.inputMain}
                    />
                </div>}

                {blogList.map((e, index) => {
                    return <div key={index} className={`${classes.blog} mt-4`}>
                        <Card >
                            <Card.Body onClick={() => { navigate(`/job/${e._id}`) }}>
                                <Card.Title ><h2>{e.title}</h2></Card.Title>
                                <Card.Text>
                                    {e.description}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">Apply to</Card.Subtitle>
                                <a className="text-decoration-none text-info" href={`mailto:${e.email}`} target='_blank'>{e.email}</a>

                            </Card.Body>
                        </Card>
                    </div>

                })}
                <div className="mb-5"></div>
            </div>
        </div>
    )
}

export default Job