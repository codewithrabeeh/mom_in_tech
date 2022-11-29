import React, { useEffect, useState, useCallback } from 'react'
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

  useEffect(() => {
    //Only works if Authenticated
    if (isAuth) {
      fetchData()
    }

  }, [isAuth])


  if (!isAuth) {
    return <Navigate to='/' />
  }

  return (
    <div className={classes.dashboard}>
      <h2>This is your dashboard.</h2>
      {blogList.map((e, key) => {
        return <h2 key={key}>{e.title}</h2> 
      })}
    </div>
  )
}

export default Dashboard