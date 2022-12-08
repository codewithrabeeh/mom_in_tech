import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import Row from 'react-bootstrap/Row';

function Footer() {
  return (
    <Row style={{height: '80px', backgroundColor: '#C4BAF4', width: '100vw'}}>
        <div className='d-flex justify-content-between align-items-center px-5'>
          <h5>© 2022 Momintech. All Rights Reserved.</h5>
          <a href="https://github.com/codewithrabeeh/mom_in_tech"><GitHubIcon style={{color: 'black'}} /></a>
        </div>
      </Row>
  )
}

export default Footer