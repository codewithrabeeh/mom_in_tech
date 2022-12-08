import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

import React from 'react'
import classes from './Home.module.css'

const firstImage = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1669874827/Group_1first_ig2ije.png'
const secondImage = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1669875019/Group_24dafasdf_qyvevy.png'
const thirdImage = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1669874924/Group_23three_cqvqdu.png'
// import {useSelector} from 'react-redux'

function Home() {
  const navigate = useNavigate()

  return (
    <Container >
      <Row className="mt-5">
        <Col className={classes.flexcenter}>

          <h4 className={classes.paragraph}>A Tech Community for Lone Parents.
            Who are struggling to raise their children. </h4>

        </Col>
        <Col>
          <img src={firstImage} style={{ width: '100%' }} alt='a women with child'/>
        </Col>
      </Row>

      <Row className="mt-3" >
        <Col>
          <img src={secondImage} style={{ width: '100%' }} alt='a girl sitting with laptop' />
        </Col>
        <Col className={classes.flexcenter}>
          <h4>Post blogs, atomic essays, thoughts, success stories here. Let
            your content inspire other
            members in this community </h4>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className={classes.flexcenter}>
          <h4 className={classes.paragraph}>Feeling alone or depressed? Vent your feelings in
            our one-to-one chat. One of our volunteer will connect with you.</h4>
        </Col>
        <Col>
          <img src={thirdImage} style={{ width: '100%' }} alt='a girl chatting' />
        </Col>
      </Row>
      <Row className='m-5' style={{height: '80px'}}>
          <div>
            <h4>
              Explore the community. Get useful resources,
              motivations, job posts and other things.
            </h4>
            
          </div>
      </Row>
      <Row>
      <div className={`${classes.flexcenter} mb-4`}>
            <Button className="justify-content-center" variant="success" onClick={()=> {navigate('/register')}}>Get Started</Button>{' '} 
            </div>
      </Row>
    </Container>
  )
}

export default Home