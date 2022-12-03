import React, { useState } from 'react'
import { useSelector } from 'react-redux'


function sample() {
    const dashboardUsername = useSelector(state => state.auth.username) // let's assume the value: 'mary'
    const [isUser, setIsUser] = useState()

    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:4000/blog/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data)
                if(data.username === dashboardUsername){
                    //data.username value is also 'mary'
                    setIsUser(true) 
                } 
            })
        } catch (e) {
            alert(e.message)
        }

    }, [])

    return (
        <div>
            <h2>Just a sample title</h2>
            {isUser && <h2>Hello User</h2>} {/* isUser is true now but not showing in first render.*/}
            
        </div>
    )
}

export default sample