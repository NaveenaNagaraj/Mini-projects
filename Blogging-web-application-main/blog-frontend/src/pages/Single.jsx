import React, { useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { SidbarContext } from "../context/SidbarContext";

import DOMPurify from "dompurify";
import UserIcon from "../component/icons/UserIcon";
import { decodeToken } from "react-jwt";

const Single = () => {
  const sideBar = React.useContext(SidbarContext);
  const postDetails = React.useContext(PostContext);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const [post, setPost] = React.useState(null);
  const decodedToken = decodeToken(
    localStorage.getItem("access_token") || null
  );

  let __URL__;
  if (document.domain === "localhost") {
    __URL__ = "http://localhost:1337";
  } else {
    __URL__ = "";
  }
  const getPost = async () => {
    const res = await fetch(`${__URL__}/api/v1/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const post = await res.json();
    setPost(post);
  };

  const [similarPosts, setSimilarPosts] = React.useState([]);
  const similarPost = async () => {
    const res = await fetch(`${__URL__}/api/v1/posts?limit=4&sort=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setSimilarPosts(data);
  };
  useEffect(() => {
    if (sideBar.showMeu) sideBar.setShowMenu(false);
    getPost();
    similarPost();
  }, [location.pathname]);

  const editPost = () => {
    postDetails.post["setTitle"](post.title);
    postDetails.post["setContent"](post.content);
    postDetails.post["setPostDate"](post.post_date);
    postDetails.post["setImageURL"](post.image_url);
    postDetails.post["setDescription"](post.description);
    postDetails.post["setPostID"](post.post_id);
    navigate(`edit`);
  };

  return (
    <div className="lg:w-[80vw] w-[95vw] mx-auto space-y-10 text-white rounded-md shadow-md my-5 flex-col lg:flex-row  relat">
      <article className="bg-gray-900 flex flex-col justify-start items-center space-y-10 my-10 pb-5">
        <div className="flex flex-col justify-center items-center space-y-5">
          <h2 className="text-left w-full flex flex-wrap text-4xl font-serif mt-5">
            {post && post.title}
          </h2>
          <img
            src={post && post.image_url}
            alt=""
            className="rounded-md lg:w-full"
          />
        </div>
        <div className="flex w-full px-6 lg:w-[60vw] space-x-5 justify-between items-center">
          <div className="flex justify-center items-center space-x-5">
            <UserIcon />
            <div>
              <h2>{post && post.user_name}</h2>
              <p>{post && post.post_date.slice(0, 10)}</p>
            </div>
          </div>
          <div className="flex space-x-5">
            {decodedToken &&
              post != null &&
              decodedToken.id === post.user_id && (
                <div className="flex space-x-5">
                  <button
                    onClick={editPost}
                    className="bg-gray-800 p-2 rounded-md hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button className="bg-gray-800 p-2 rounded-md hover:bg-gray-700">
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className="lg:w-[60vw] w-[95%] text-justify">
          {post && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          )}
        </div>
      </article>
      <div className="">
        <h4 className="font-space text-4xl text-center m-10 underline">
          Similar Posts you might like
        </h4>
        <div className="bg-gray-900 text-white flex flex-col lg:flex-row flex-wrap justify-center items-center space-y-5 lg:space-y-0 p-5">
          {similarPosts &&
            similarPosts.map((blog, index) => {
              return (
                <div
                  key={index}
                  className="bg-black w-full lg:w-[300px] p-2 hover:shadow-2xl lg:m-2 space-y-2"
                >
                  <img src={blog.image_url} alt="" className="rounded-sm" />
                  <h2 className="mt-5 text-2xl font-semibold">{blog.title}</h2>
                  <p className="line_clamp_4">{blog.description}</p>
                  <div>
                    <Link to={`/post/${blog.post_id}`} className="bg-[#ffd700] px-3 lg:px-5 py-1 rounded-sm shadow-lg text-[#7d0000] ">
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Single;
