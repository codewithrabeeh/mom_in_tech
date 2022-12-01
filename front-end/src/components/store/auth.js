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
        clearToken(state) {
            localStorage.clear()
            state.token = ''
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer