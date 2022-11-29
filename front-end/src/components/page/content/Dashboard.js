import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import classes from './Dashboard.module.css'
import { authActions } from '../../store/auth'


function Dashboard() {

  const isAuth = useSelector(state => state.auth.token)
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

  const deleteHandler = async (id) => {
    const response = await fetch(`http://127.0.0.1:4000/blog/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${isAuth}`
      }
    })

    const data = await response.json()

    if(data) {
      fetchData()
    }
  }
  useEffect(() => {
    //Only works if Authenticated
    if (isAuth) {
      fetchData()
    }

  }, [isAuth])


  if (!isAuth) {
    return <Navigate to='/' />
  }

  if(blogList.length){

    console.log(blogList)
  }
  return (
    <div className={classes.dashboard}>
      <h1 style={{textAlign: 'center', paddingTop: '25px'}}>This is your dashboard.</h1>
      {blogList.map((e, key) => {
        return (<div style={{padding: '40px'}}> 
          <h1>{e.title}</h1>
          <p>{e.body}</p>
          <h5>By {e.username}</h5>
          <button onClick={() => {deleteHandler(e._id)}}>Delete</button>
        </div>)
      })}
    </div>
  )
}

export default Dashboard