import { configureStore, } from "@reduxjs/toolkit";

import authReducer from './auth'
import blogReducer from './blog'

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
    }
})


export default store;