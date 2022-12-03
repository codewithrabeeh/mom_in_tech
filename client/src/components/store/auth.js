import { createSlice } from "@reduxjs/toolkit";


const initiateAuthState = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token')
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
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer