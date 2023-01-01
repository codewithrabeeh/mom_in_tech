import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from './auth'
import { useParams } from 'react-router-dom'

const host = 'http://127.0.0.1:4005'

export const likeBlog = createAsyncThunk("blog/likeBlog", (data) => {
try {

  fetch(`${host}/blog/${data.blogID}/like`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userName: data.userName, like: data.like }),
  });
  return data

} catch (e) {
  alert("An Error Occured While Liking"); 
}
});

export const getAllBlog = createAsyncThunk('blog/getAllBlog', async (host) => {

  const response = await fetch(`${host}/blog`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();


  if (data.status === "Unauthorized") {
    authActions.clearToken()
  } else { }

  if (!data.status) {
    alert("An Error Occured While Fetching");
  }
  return data;

})

export const getABlog = createAsyncThunk('blog/getABlog', async (blog) => {

  const response = await fetch(`${blog.host}/blog/${blog.blogId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  console.log(data)

  if (data.status === "Unauthorized") {
    authActions.clearToken()
  }


  return data;

})

const blogReducer = createSlice({
  name: "blog",
  initialState: { token: localStorage.getItem("token"), blogList: [], blog: {} },

  reducers: {

  },
  extraReducers: {
    [likeBlog.fulfilled]: (state, action) => {
      // taking and parsing state data
      const blogList = JSON.parse(JSON.stringify(state.blogList));

      if (action.payload.single) {
        if (action.payload.like) state.blog.like?.push(action.payload.userName)
        else state.blog.like?.splice(state.blogList.indexOf(action.payload.userName), 1);
      } else {
        state.blogList = blogList.map(blog => {
          
          if (blog._id === action.payload.blogID) {
            
            if (action.payload.like) {
              

              blog.like.push(action.payload.userName);
            } else {
              
              blog.like.splice(blog.like.indexOf(action.payload.userName), 1)
            }
          }
       
          return blog;
        });
      }
    },
    [getAllBlog.fulfilled]: (state, action) => {
      state.blogList = action.payload.post
    },
    [getABlog.fulfilled]: (state, action) => {
      state.blog = action.payload
    }
  },
});
export default blogReducer.reducer;
