import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import parseBody from "html-react-parser";
import Form from "react-bootstrap/Form";

import LikeButton from "@mui/icons-material/FavoriteBorder";
import LikeFill from "@mui/icons-material/Favorite";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./BlogDetails.module.css";
import { authActions } from "../../../store/auth";
import SidePanel from "../SidePanel";
import Skeleton from "@mui/material/Skeleton";

import { getABlog, getAllBlog, likeBlog } from "../../../store/blog";

function PostDetails() {
  const dispatch = useDispatch()
  const params = useParams();
  const { blogId } = params;
  const isAuth = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.username);
  const singleBlog = useSelector((state) => state.blog.blog);
  const [blog, setBlog] = useState({ body: "" });
  const [isUser, setIsUser] = useState();

  const navigate = useNavigate();

  const handleLike = (blogID, like) => {
    dispatch(likeBlog({ userName, blogID, like,single:true }));
  };

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

  // const fetchData = async () => {
  //   const response = await fetch(`http://127.0.0.1:4005/blog/${blogId}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${isAuth}`,
  //     },
  //   });

  //   const data = await response.json();
  //   setBlog(data);

  //   if (data.username === userName) {
  //     setIsUser(true);
  //   } else {
  //     setIsUser(false);
  //   }
  // };

  useEffect(() => {

      dispatch(getABlog(blogId));

  }, []);
  console.log(singleBlog);
  // { parseBody(singleBlog?.body) }
  console.log(blog);
  return (
    // <div className={classes.dashboard}>
    //   <div className={classes.dashboardOne}>
    //     <div className={`${classes.blog} mt-4`}>
    //       <Card>
    //         <Card.Body>
    //           <Card.Title>
    //             <h2>
    //               {blog.title} {isUser}
    //             </h2>
    //           </Card.Title>
    //           <Card.Text>{parseBody(blog.body)}</Card.Text>
    //           {isUser ? (
    //             <Button
    //               onClick={() => {
    //                 navigate(`/editblog/${blogId}`);
    //               }}
    //               variant="primary"
    //               className="me-4"
    //             >
    //               Edit
    //             </Button>
    //           ) : null}
    //           {isUser ? (
    //             <Button onClick={deleteHandler} variant="danger">
    //               Delete
    //             </Button>
    //           ) : null}
    //           <Card.Subtitle className={`mt-2`}>
    //             <box-icon
    //               className={classes.hoverHeart}
    //               name="heart"
    //             ></box-icon>
    //           </Card.Subtitle>
    //         </Card.Body>
    //       </Card>
    //     </div>
    //   </div>
    //   <SidePanel />
    // </div>
    <div className={classes.dashboard}>
      <div className={classes.dashboardOne}>
       

        {/* {blogList.map((blog) => { */}
          {/* return ( */}
            <div className={`${classes.blog} mt-4`}>
              <Card
                onClick={(e) => {
                  e.stopPropagation();
              navigate(`/blog/${singleBlog?._id}`);
                }}
              >
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
                    />
                    <span> likes {singleBlog.like?.length}</span>

                      </>
                    ) : (
                      <>
                        <LikeButton
                          onClick={(e) => {
                            e.stopPropagation();
                          handleLike(singleBlog?._id, true);
                          }}
                      />
                      <span> likes { singleBlog.like?.length}</span>
                      </>
                    )}

                   
                  </Card.Subtitle>
                  {isUser ? (
                <Button
                  onClick={() => {
                    navigate(`/editblog/${blogId}`);
                  }}
                  variant="primary"
                  className="me-4"
                >
                  Edit
                </Button>
              ) : null}
              {isUser ? (
                <Button onClick={deleteHandler} variant="danger">
                  Delete
                </Button>
              ) : null}
                </Card.Body>
              </Card>
            </div>
       
      </div>
      {/* <SidePanel /> */}
    </div>
  );
}

export default PostDetails;


// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";

// import LikeButton from "@mui/icons-material/FavoriteBorder";
// import LikeFill from "@mui/icons-material/Favorite";

// import parseBody from "html-react-parser";

// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux"; 
// import { useNavigate, useParams } from "react-router-dom";
// import classes from "./BlogDetails.module.css";
// import { authActions } from "../../../store/auth";
// import SidePanel from "../SidePanel";
// import { getAllBlog, getABlog, likeBlog } from "../../../store/blog";

// function PostDetails() {
//   const params = useParams()
//   const navigate = useNavigate();
//   const userName = useSelector((state) => state.auth.username);
//   const isAuth = useSelector((state) => state.auth.token);
//   const blogList = useSelector((state) => state.blog.blogList);
//   const dispatch = useDispatch();
//   // const [blogList, setBlogList] = useState([]);
//   const [like, setLike] = useState(false);
//   const [setData, data] = useState()
//   const {blogId} = params

//   async function fetchData(){
//     const getData = await dispatch(getABlog(blogId))
//     setData(getData)
//     console.log(data)
//   }  

//   useEffect(() => {
//   }, []);

//   const handleLike = (blogID, like) => {
//     dispatch(likeBlog({ userName, blogID, like }));
//   };

//   return (
//     <div className={classes.dashboard}>
//       <div className={classes.dashboardOne}>       
      
//           return (
//             <div className={`${classes.blog} mt-4`}>
//               <Card
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   navigate(`/blog/${data._id}`);
//                 }}
//               >
//                 <Card.Body>
//                   <Card.Title>
//                     <h2>{data.title}</h2>
//                   </Card.Title>
//                   <Card.Text>{parseBody(data.body)}</Card.Text>
//                   <Card.Subtitle>
//                     {data?.like.some((data) => data === userName) ? (
//                       <>
//                         <LikeFill
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleLike(data._id, false);
//                           }}
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <LikeButton
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleLike(data._id, true);
//                           }}
//                         />
//                       </>
//                     )}

//                     {/* /blog/:id/like */}
//                   </Card.Subtitle>
//                 </Card.Body>
//               </Card>
//             </div>
//           );
        
//       </div>
//       <SidePanel />
//     </div>
//   );
// }

// export default PostDetails;
