import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CreatePost from '../create/BlogPost';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './Blog.module.css'
import { authActions } from '../../../store/auth'
import SidePanel from '../SidePanel';

function Dashboard() {

  const navigate = useNavigate()
  const isAuth = useSelector(state => state.auth.token)
  const blah = useSelector(state => state.auth.username)
  const dispatch = useDispatch()
  const [blogList, setBlogList] = useState([])

  const fetchData = async () => {

    const response = await fetch('http://127.0.0.1:4000/blog', {
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

        <div className={`${classes.inputDiv} mt-4`}>
          <Form.Control
            onClick={() => {navigate('/createblog')}}
            placeholder="Create a post"
            type="text"
            id="createPost"
            aria-describedby="createapost"
            className={classes.inputMain}
          />
        </div>

        {blogList.map((e, index) => {
          return <div key={index} className={`${classes.blog} mt-4`}>
            <Card onClick={() => { navigate(`/post/${e._id}`) }}>
              <Card.Body>
                <Card.Title><h2>{e.title}</h2></Card.Title>
                <Card.Text>
                  {e.body}
                </Card.Text>
                <Card.Subtitle><box-icon name='heart'></box-icon></Card.Subtitle>
              </Card.Body>
            </Card>
          </div>

        })}

      </div>
      <SidePanel />
    </div>
  )
}

export default Dashboard