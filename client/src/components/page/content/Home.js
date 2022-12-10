import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

import React from 'react'
import classes from './Home.module.css'
const firstImage = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1670501238/Group_1first_1_cc6rxd.png'
const secondImage = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1670501296/Group_24dafasdf_1_a44mzy.png'
const thirdImage = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1670501368/Group_23three_1_zmdoks.png'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
    <Container >
      <Row className="mt-5">
        <Col className={classes.flexcenter}>

          <h4 className={classes.paragraph}>A Tech Community for single moms, who are struggling to raise their children and make ends meet. Get inspired by the successful and motivational stories of fellow members. Acquire knowledge from articles and resources.</h4>

        </Col>
        <Col>
          <img src={firstImage} style={{ width: '100%' }} alt='a women with child' />
        </Col>
      </Row>

      <Row className="mt-3" >
        <Col>
          <img src={secondImage} style={{ width: '100%' }} alt='a girl sitting with laptop' />
        </Col>
        <Col className={classes.flexcenter}>
          <h4>Post blogs, atomic essays, thoughts, and success stories here. Let your content inspire other members of this community.  Attend events happening near you. Apply to job openings and many more. </h4>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className={classes.flexcenter}>
          <h4 className={classes.paragraph}>Feeling alone or unmotivated? Vent your feelings in our live group chat. Talk with like-minded people. Ask for tips and tricks.</h4>
        </Col>
        <Col>
          <img src={thirdImage} style={{ width: '100%' }} alt='a girl chatting' />
        </Col>
      </Row>
     
      <div className='m-5 d-flex flex-column justify-content-center' style={{ height: '400px', marginTop: '80px' }}>
      <div style={{textAlign: 'center'}}>
          <h4>
            Explore the community. Get useful resources,
            motivations, job listing and many more.
          </h4>

        </div>

        <div className={`${classes.flexcenter} mb-4 mt-5`} style={{height: '50px'}}>
          <Button size='lg' className="justify-content-center" variant="success" onClick={() => { navigate('/register') }}>Get Started</Button>{' '}
        </div>

      </div>
    </Container>
      
    </div>
  )
}

export default Home
