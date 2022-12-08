import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import parseBody from "html-react-parser";

import LikeButton from "@mui/icons-material/FavoriteBorder";
import LikeFill from "@mui/icons-material/Favorite";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Details.module.css";
import Skeleton from "@mui/material/Skeleton";

import { getABlog, likeBlog } from "../../../store/blog";

function PostDetails() {
  const dispatch = useDispatch()
  const params = useParams();
  const { blogId } = params;
  const isAuth = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.username);
  const singleBlog = useSelector((state) => state.blog.blog);

  const navigate = useNavigate();

  const handleLike = (blogID, like) => {
    dispatch(likeBlog({ userName, blogID, like,single:true }));
  };
console.log(blogId)
  const deleteHandler = async () => {
    const response = await fetch(`http://127.0.0.1:4005/blog/${blogId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${isAuth}`,
      },
    });

    const data = await response.json();
    navigate("/dashboard");
  };

  useEffect(() => {

      dispatch(getABlog(blogId));

  }, []);
  
  return (

    <div className={classes.dashboard}>
      <div className={classes.dashboardOne}>
       
            <div className={`${classes.blog} mt-4`}>
              <Card>
                <Card.Body>
                  <Card.Title>
                <h2>{singleBlog?.title}</h2>
                  </Card.Title>
              <Card.Text>{singleBlog.body ? parseBody(singleBlog?.body) : Array(4).fill(0).map(() => <Skeleton />)}</Card.Text>
                  <Card.Subtitle>
                {singleBlog?.like?.some((el) => el === userName) ? (
                      <>
                        <LikeFill
                          onClick={(e) => {
                            e.stopPropagation();
                        handleLike(singleBlog?._id, false);
                          }}
                          style={{color: 'red'}}
                    />
                    <span> {singleBlog.like?.length}</span>

                      </>
                    ) : (
                      <>
                        <LikeButton
                          onClick={(e) => {
                            e.stopPropagation();
                          handleLike(singleBlog?._id, true);
                          }}
                      />
                      <span> { singleBlog.like?.length}</span>
                      </>
                    )}

                   
                  </Card.Subtitle>
                  <Card.Subtitle className='mt-4'>
                  {singleBlog.username === userName ? (
                <Button
                  onClick={() => {
                    navigate(`/editblog/${blogId}`);
                  }}
                  style={{backgroundColor: '#80ccc8', border: 'none'}}
                  className="me-4"
                >
                  Edit
                </Button>
              ) : null}
              {singleBlog.username === userName ? (
                <Button onClick={deleteHandler} style={{background: '#dc3545', border: 'none'}}
                >
                  Delete
                </Button>
              ) : null}
              </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
       
      </div>
    </div>
  );
}

export default PostDetails;
