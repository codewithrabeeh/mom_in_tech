import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import LikeButton from "@mui/icons-material/FavoriteBorder";
import LikeFill from "@mui/icons-material/Favorite";

import parseBody from "html-react-parser";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Blog.module.css";
import { getAllBlog, likeBlog } from "../../../store/blog";
import Skeleton from "@mui/material/Skeleton";

function Dashboard() {
  const host = 'http://127.0.0.1:4005'
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.username);
  const isAuth = useSelector((state) => state.auth.token);
  const blogList = useSelector((state) => state.blog.blogList);
  const dispatch = useDispatch();
  const SkeletonOfBlog = (

    <div className={`${classes.blog} mt-4`}>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>
              <Skeleton width="220px" animation="wave" />
            </h2>
          </Card.Title>
          <Card.Text>
            <>
              <Skeleton animation="wave" /> <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          </Card.Text>
          <Card.Subtitle></Card.Subtitle>
        </Card.Body>
      </Card>
    </div>

  );

  useEffect(() => {
    dispatch(getAllBlog(host));
  }, []);

  const handleLike = (blogID, like) => {
    dispatch(likeBlog({ userName, blogID, like, host })); 
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboardOne}> 
      {isAuth && <div className={`${classes.inputDiv} mt-4`}>
          <Form.Control
            onClick={() => {
              navigate("/createblog");
            }}
            placeholder="Create a blog"
            type="text"
            id="createPost"
            aria-describedby="createapost"
            className={classes.inputMain}
          />
        </div>}

        {blogList.length>0 ? blogList.map((el, index) => {
          return (
            <div key={index} className={`${classes.blog} mt-3`}>
              <Card
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${el._id}`);
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h2>
                      {el.title ? (
                        el.title
                      ) : (
                        <Skeleton width="220px" animation="wave" />
                      )}
                    </h2>
                  </Card.Title>
                  <Card.Text>
                    {el.body ? (
                      parseBody(el.body)
                    ) : (
                      <>
                        <Skeleton animation="wave" />{" "}
                        <Skeleton animation="wave" />{" "}
                        <Skeleton animation="wave" />
                      </>
                    )}
                  </Card.Text>
                  <Card.Subtitle>
                    {el?.like.some((el) => el === userName) ? (
                      <>
                        <LikeFill
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(el._id, false);
                          }}
                          style={{color: 'red'}}
                        />
                        <span> {el.like?.length}</span>
                      </>
                    ) : (
                      <>
                        <LikeButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(el._id, true);
                          }}
                        />
                        <span> {el.like?.length}</span>
                      </>
                    )}

                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          );
        }) : <> {SkeletonOfBlog}{SkeletonOfBlog}{SkeletonOfBlog}</>}
        <div className="mb-5"></div>
      </div>
    </div>
  );
}

export default Dashboard;
