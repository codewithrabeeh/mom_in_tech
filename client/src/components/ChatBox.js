import React, { useRef, useState, useEffect } from 'react'
import classes from './ChatBox.module.css'
import Form from 'react-bootstrap/Form';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import *  as  Realm from "realm-web";
import { authActions } from './store/auth'

const app = new Realm.App({ id: "application-0-wfjzk" });

function ChatBox() {
    const chatMessageDiv = useRef(null)
    const inputRef = useRef()
    const dispatch = useDispatch()
    const userName = useSelector(state => state.auth.username)
    const isAuth = useSelector(state => state.auth.token)
    const toggleChat = useSelector(state => state.auth.isChatOpen)
    const [messageData, setMessageData] = useState()
    const [events, setEvents] = useState([]);
    const [limit, setLimit] = useState(60)


    const onSendMessageHandler = async () => {
        if (inputRef.current.value) {
            try {
                setLimit(limit + 1)
                const response = await fetch(`http://127.0.0.1:4005/chat`, {
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
                alert(e.message)
            }
        } else {
            alert('Message Input is Empty')
        }
    }


    const onLoadMoreHandler = async () => {
        try {
            setLimit(limit + 30)
            const response = await fetch('http://127.0.0.1:4005/chatmessageload', {
                method: 'POST',
                body: JSON.stringify({
                    limit: limit + 30
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            const reversed = data.chat.reverse();
            setMessageData(reversed)
        } catch (e) {
            alert(e.message)
        }
    }

    const syncGroupMessage = async () => {
        try {

            const response = await fetch('http://127.0.0.1:4005/chatmessageload', {
                method: 'POST',
                body: JSON.stringify({
                    limit: limit
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            const reversed = data.chat.reverse();
            // const onlyUsernames = reversed.map(e => e.username)
            // setMentionName(onlyUsernames)
            setMessageData(reversed)
        } catch (e) {

        }
    }

    useEffect(() => {
        const login = async () => {
            const user = await app.logIn(Realm.Credentials.anonymous());

            const mongodb = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongodb.db("momintech").collection("chatgroups");

            for await (const change of collection.watch()) {
                setEvents(events => [...events, change]);
            }
        }
        login();
    }, []);

    useEffect(() => {
        if (events) {
            syncGroupMessage()
        }
    }, [events])

    useEffect(() => {
        if (chatMessageDiv) {
            chatMessageDiv.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'auto' });
            });
        }
    }, [toggleChat])

    return (
        <div>
            <div className={`${classes.chatbox} ${toggleChat ? classes.chatboxtrue : classes.chatboxfalse}`}>

                <div className={`${classes.messageBar}`} >
                    <h5 className='pt-2 ps-2'>Momintech - Chat Group</h5>
                    {toggleChat && <ArrowDropDownIcon onClick={() => { dispatch(authActions.toggleChat()) }} className={`me-1 ${classes.dropdown}`} />}
                    {!toggleChat && <ArrowDropUpIcon onClick={() => { dispatch(authActions.toggleChat()); syncGroupMessage(); }} className={`me-1 ${classes.dropdown}`} />}
                </div>

                <div ref={chatMessageDiv} className={classes.messagebox}>

                    {!messageData && <div className="d-flex justify-content-center w-100 mt-2 mb-2"><Button size='sm' variant="warning" onClick={onLoadMoreHandler}>Load More</Button>{' '}</div>}

                    {messageData ? messageData.map((e, i) => {
                        const isTheUser = userName === e.username
                        return <div key={i} className={classes.message} style={{ backgroundColor: isTheUser ? 'white' : 'rgb(145 214 245)', alignSelf: isTheUser ? 'flex-start' : 'flex-end', marginTop: '3px', fontFamily: 'Roboto', lineHeight: '20px', paddingLeft: '7px' }}>
                            {e.message}
                            <div style={{ fontSize: '10px', color: 'grey', fontFamily: 'Zen Dots' }}>
                                by {isTheUser ? 'You' : e.username}
                            </div>
                        </div>
                    }) : <div className="d-flex justify-content-center w-100 mt-2 mb-2"><Button size='sm' variant="success" onClick={syncGroupMessage} >Refresh</Button>{' '}</div>}

                </div>

                {isAuth && <div className={`${classes.input} d-flex justify-content-center align-items-center`}>
                    <Form.Control
                        type="text"
                        ref={inputRef}
                        placeholder="Send Message"
                        style={{boxShadow: 'none', border: '0', outline: '0', borderRadius: '0'}}
                    />
                    <Button style={{ borderRadius: '0' }} variant="success" onClick={onSendMessageHandler}>Send</Button>{' '}
                </div>}
            </div>
        </div>
    )
}

export default ChatBox