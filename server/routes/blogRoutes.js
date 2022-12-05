const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const Blog = require("../model/blogModel");
const jwt = require("jsonwebtoken");
const { isAuth } = require("../middleware/Auth");

router.get("/blog", async (req, res) => {
  try {
    const post = await Blog.find();
    res.send({ post, status: true });
  } catch (e) {
    res.send({ message: "Failed to Get Blog Collections", status: false });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id });
    blog ? res.send(blog) : res.send({ message: "There is no such blog" });
  } catch (e) {
    res.send({ message: "Failed to Get Blog Detail", status: false });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const { title, body, username } = req.body;
    const post = new Blog({
      title,
      body,
      username,      
    });
    await post.save();
    res.send({ message: "Successfully Saved", status: true });
  } catch (e) {
    res.send({ message: "Failed to Post Blog", status: false });
  }
});

router.patch("/blog/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body });
    res.send({ message: "Successfully Updated!", status: true });
  } catch (e) {
    res.send({ message: "Failed to Edit Blog", status: false });
  }
});

router.delete("/blog/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Blog.deleteOne({ _id: id });
    res.send({ message: "Successfully Deleted", status: true });
  } catch (e) {
    res.send({ message: "Failed to Delete Blog " + e.message, status: false });
  }
});

router.post("/blog/:id/like", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body.like ? await Blog.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $push: { like: req.body.userName } }
    ) : await Blog.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $pull: { like: req.body.userName } }
    )
    res.send({ message: "liked", status: true });
  } catch (e) {
    res.send({
      message: "something went wrong " + e.message,
      status: false,
    });
  }
});

router.get('/searchblog', async (req, res) => {
  try {
      const {title} = req.query
      const agg = [
          {
              $search: {
                  autocomplete: {
                      query: title,
                      path: 'title',
                      fuzzy: {
                          maxEdits: 1
                      }
                  }
              }
          },
          {
              $limit: 5
          },
          {
              $project: {
                  _id: 1,
                  title: 1,                                         
              }
          }
      ]

     const response = await Blog.aggregate(agg)
 
  let arr = response.map((obj) => {
      let first = Object.values(obj)[0]
      let second = Object.values(obj)[1]
      return {id: first, name: second}
  })
  
     return res.json(arr)        
  } catch (error) {
      console.log(error.message)
      return res.send('')
  } 
})

module.exports = router;
