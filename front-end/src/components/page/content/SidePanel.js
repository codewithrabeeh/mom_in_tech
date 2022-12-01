import React from 'react'
import Button from 'react-bootstrap/Button';
import classes from './SidePanel.module.css'

function SidePanel() {
  return (
    <div className={classes.dashboardTwo}>
        <Button style={{ backgroundColor: '#00DD31', color: 'black', fontWeight: '600', marginTop: '10px' }} size="lg" active>
          Chat Live!
        </Button>{' '}
        <div className='mt-5'>
        <span className='d-flex gap-3'><box-icon type='solid' name='calendar-event'></box-icon> <h5>Events</h5></span>
        <span className='d-flex gap-3 mt-3'><box-icon name='briefcase'></box-icon> <h5>Jobs</h5></span>
        <span className='d-flex gap-3 mt-3'><box-icon name='book-content'></box-icon> <h5>Resources</h5></span>
        </div>
      </div>
  )
}

export default SidePanel