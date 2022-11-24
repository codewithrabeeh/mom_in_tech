import { createSlice } from "@reduxjs/toolkit";

const initiateAuthState = {
    isAuthenticated: false,
    username: ''
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initiateAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer