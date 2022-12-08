import { createSlice } from "@reduxjs/toolkit";


const initiateAuthState = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    isChatOpen: false  
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initiateAuthState,
    reducers: {
        token(state, action) {
            const token = action.payload
            state.token = token
        },
        userName(state, action) {
            const username = action.payload
            state.username = username
        },
        clearToken(state) {
            localStorage.clear()
            state.token = ''
            state.username = ''
        },
        toggleChat(state) {
            state.isChatOpen = !state.isChatOpen 
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer