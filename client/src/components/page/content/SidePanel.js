import React from 'react'
import Button from 'react-bootstrap/Button';
import classes from './SidePanel.module.css'
import { useNavigate } from 'react-router-dom'

function SidePanel({ chat }) {
  const navigate = useNavigate()
  const chatHandle = () => {
    chat((i) => !i)
  }
  return (
    <div className={classes.dashboardTwo}>
      <Button style={{ backgroundColor: '#00DD31', color: 'black', fontWeight: '600', marginTop: '10px' }} size="lg" onClick={chatHandle}>
        Chat Live!
      </Button>
      <div className='mt-5'>
        <span style={{ cursor: 'pointer' }} onClick={() => { navigate('/event') }} className='d-flex gap-3'><box-icon type='solid' name='calendar-event'></box-icon> <h5>Events</h5></span>
        <span style={{ cursor: 'pointer' }} onClick={() => { navigate('/job') }} className='d-flex gap-3 mt-3'><box-icon name='briefcase'></box-icon> <h5>Jobs</h5></span>
      </div>
    </div>
  )
}

export default SidePanel