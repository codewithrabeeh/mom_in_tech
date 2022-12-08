import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './Blog.module.css'
import { authActions } from '../../../store/auth'
import Skeleton from "@mui/material/Skeleton";

function Event() {

  const SkeletonOfBlog = (

    <div className={`${classes.blog} mt-4`}>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>
              <Skeleton width="220px" animation="wave" />
            </h2>
          </Card.Title>
          <Card.Text>
            <>
              <Skeleton animation="wave" /> <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          </Card.Text>
          <Card.Subtitle></Card.Subtitle>
        </Card.Body>
      </Card>
    </div>

  );

  const navigate = useNavigate()
  const isAuth = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [eventList, setEventList] = useState([])

  const fetchData = async () => {

    const response = await fetch('https://urchin-app-a4mge.ondigitalocean.app/event', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${isAuth}`
      }
    })

    const data = await response.json()

    setEventList(data.event)

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

    <div className={`${classes.dashboard}`}>

      <div className={classes.dashboardOne}>

       {isAuth && <div className={`${classes.inputDiv} mt-4`}>
          <Form.Control
            onClick={() => { navigate('/createevent') }}
            placeholder="Create an event"
            type="text"
            id="createPost"
            aria-describedby="createapost"
            className={classes.inputMain}
          />
        </div>}

        {eventList.length > 0 ? eventList.map((e, index) => {
          return <div key={index} className={`${classes.blog} mt-4`}>
            <Card onClick={() => { navigate(`/event/${e._id}`) }}>
              <Card.Body>
                <Card.Title><h2>{e.title}</h2></Card.Title>
                <Card.Text>
                  {e.description}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Location <p className='text-dark'>{e.location}</p></Card.Subtitle>
                <a href={`https://${e.link}`} target="_blank">{e.link}</a>

              </Card.Body>
            </Card>
          </div>

        }) : <> {SkeletonOfBlog}{SkeletonOfBlog}{SkeletonOfBlog}</> }
        <div className="mb-5"></div>

      </div>
    </div>
  )
}

export default Event