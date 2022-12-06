import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LikeButton from '@mui/icons-material/FavoriteBorder';
import LikeFill from '@mui/icons-material/Favorite';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './EditBlog.module.css'
import SidePanel from '../SidePanel';

function EditBlog() {

    const params = useParams()
    const { blogId } = params
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const [blog, setBlog] = useState([])
    const [body, setBody] = useState()
    const [like, setLike] = useState(false);
    const titleRef = useRef()



    const editPostHandler = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:4005/blog/${blogId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    body: body,
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })

            const data = await response.json()

            alert('Successfully Created a Post')
            navigate('/dashboard')

        } catch (e) {
            alert('Failed to Create Post')
        }
    }
    const cancelHandler = () => {
        navigate('/dashboard')
    }

    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:4005/blog/${blogId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        setBlog(data)
        console.log(data)
        titleRef.current.value = data.title
        // bodyRef.current.value = data.body

    }

    useEffect(() => {
        try {
            fetchData()
        } catch (e) {
            alert(e.message)
        }
    }, [userName, isAuth])

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-5 border-rounded`}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">
                </div>
                <div className={`${classes.titleDiv} w-75 rounded`}>
                    <Form.Control
                        ref={titleRef}
                        placeholder="Title"
                        type="text"
                        id="createPost"
                        aria-describedby="createapost"
                        className={`${classes.inputMain} w-75 mt-3`}
                    />
                    <div className='w-75 mt-2 mb-4'>
                        <CKEditor

                            editor={ClassicEditor}
                            data={blog.body}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBody(data)
                            }}
                        />
                    </div>
                    <div className="d-flex mb-4">
                        <Button onClick={editPostHandler} variant="success" className='me-5'>Edit Post</Button>
                        <Button onClick={cancelHandler} variant="danger" className=''>Cancel</Button>
                        {!like ? <LikeButton onClick={() => setLike((l) => !l)} /> : <LikeFill onClick={() => setLike((l) => !l)} />}

                    </div>
                </div>
            </div>
            <SidePanel />
        </div>
    )
}

export default EditBlog 