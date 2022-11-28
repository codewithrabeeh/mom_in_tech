import { createSlice } from "@reduxjs/toolkit";

const initiateAuthState = {
    // isAuthenticated: false,
    username: '',
    token: localStorage.getItem('token')
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initiateAuthState,
    reducers: {
       /*  login(state) {      
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
        }, */
        token(state, action) {
            const token = action.payload
            state.token = token
        },
        clearToken(state) {
            state.token = ''            
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer