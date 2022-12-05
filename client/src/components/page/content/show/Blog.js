import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import LikeButton from "@mui/icons-material/FavoriteBorder";
import LikeFill from "@mui/icons-material/Favorite";

import parseBody from "html-react-parser";

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Blog.module.css";
import { authActions } from "../../../store/auth";
import SidePanel from "../SidePanel";
import { getAllBlog, likeBlog } from "../../../store/blog";

function Dashboard() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.username);
  const isAuth = useSelector((state) => state.auth.token);
  const blogList = useSelector((state) => state.blog.blogList);
  const dispatch = useDispatch();
  // const [blogList, setBlogList] = useState([]);
  const [like, setLike] = useState(false);

  // const fetchData = 

  useEffect(() => {
    dispatch(getAllBlog())
  }, []);

  const handleLike = (blogID, like) => {
    dispatch(likeBlog({ userName, blogID, like }));
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboardOne}>
        <div className={`${classes.inputDiv} mt-4`}>
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
        </div>

        {blogList.map((el, index) => {
          return (
            <div key={index} className={`${classes.blog} mt-4`}>
              <Card
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${el._id}`);
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h2>{el.title}</h2>
                  </Card.Title>
                  <Card.Text>{parseBody(el.body)}</Card.Text>
                  <Card.Subtitle>
                    {el?.like.some((el) => el === userName) ? (
                      <>
                        <LikeFill
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(el._id, false);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <LikeButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(el._id, true);
                          }}
                        />
                      </>
                    )}

                    {/* /blog/:id/like */}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <SidePanel />
    </div>
  );
}

export default Dashboard;
