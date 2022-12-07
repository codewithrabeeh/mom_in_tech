import React, { useRef, useState, useEffect } from 'react'
import classes from './ChatBox.module.css'
import Form from 'react-bootstrap/Form';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card';
import *  as  Realm from "realm-web";
import {authActions} from './store/auth'

const app = new Realm.App({ id: "application-0-wfjzk" });

function ChatBox() {
    const inputRef = useRef()
    const dispatch = useDispatch()
    const userName = useSelector(state => state.auth.username)
    const isAuth = useSelector(state => state.auth.token)
    const toggleChat = useSelector(state => state.auth.isChatOpen)
    const sampleData = [{ username: 'Jhon', message: 'Hello' }, { username: 'Ram', message: 'Hey' }]
    const [messageData, setMessageData] = useState()
    const [events, setEvents] = useState([]);


    const onSendMessageHandler = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4005/chat', {
                method: 'POST',
                body: JSON.stringify({
                    username: userName,
                    message: inputRef.current.value
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })

            const data = await response.json()

            if (!data.status) {
                alert('Failed to send message')
            }

            inputRef.current.value = ''
            syncGroupMessage()

        } catch (e) {
            alert('line 44', e.message)
        }
    }

    const syncGroupMessage = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4005/chat')
            const data = await response.json()
            setMessageData(data.chat)
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        const login = async () => {
            console.log('changestream started')
          // Authenticate anonymously
          const user = await app.logIn(Realm.Credentials.anonymous());
        //   setUser(user); 
    
          // Connect to the database
          const mongodb = app.currentUser.mongoClient("mongodb-atlas");
          const collection = mongodb.db("momintech").collection("chatgroups");
    
          // Everytime a change happens in the stream, add it to the list of events
          for await (const change of collection.watch()) {
            setEvents(events => [...events, change]);
          }
        }
        login();
      }, []);
    
      useEffect(() => {
        if(events){
            syncGroupMessage()
        }
      }, [events])

    return (
        <div> {/* style={{ display: 'flex', height: openChat ? '55%' : "0" }} */}        
            <div className={classes.chatbox} style={{height: toggleChat ? '400px' : '5%'}} >
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='pt-2 ps-2'>Group Chat</h5>
                    {toggleChat && <ArrowDropDownIcon onClick={() => {dispatch(authActions.toggleChat())}} className={`me-1 ${classes.dropdown}`} />}
                    {!toggleChat && <ArrowDropUpIcon onClick={() => {dispatch(authActions.toggleChat())}} className={`me-1 ${classes.dropdown}`} />}
                </div>
                <div className={classes.messagebox}>
                    {messageData ? messageData.map((e, i) => {
                        const isTheUser = userName === e.username
                    return <div key={i} className={classes.message} style={{backgroundColor: isTheUser ? 'white' : 'skyblue', alignSelf: isTheUser ? 'flex-start' : 'flex-end', marginTop: '3px'}}>                       
                        {e.message} 
                        <div style={{fontSize: '10px', color: 'grey'}}>
                            by {isTheUser ? 'You' : e.username} 
                            </div>
                        </div>
                    }) : null}
                </div>
                {isAuth && <div className='d-flex'>
                 <Form.Control
                        type="text"
                        ref={inputRef}
                        placeholder="Send Message"                        
                    />
                    <Button variant="secondary" onClick={onSendMessageHandler}>Send</Button>{' '}
                </div>}
            </div>
        </div>
    )
}

export default ChatBox

/* {messageData ? messageData.map((e, i) => {
    const isTheUser = userName === e.username
return <div key={i} className={classes.message} style={{backgroundColor: isTheUser ? 'white' : 'skyblue', alignSelf: isTheUser ? 'flex-start' : 'flex-end', marginTop: '3px'}}>
    {e.message} by {isTheUser ? 'You' : e.username} 
    </div>
}) : null} */