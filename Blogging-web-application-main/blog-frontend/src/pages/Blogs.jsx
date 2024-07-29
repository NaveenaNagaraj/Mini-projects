import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../utils/utils.css";
import { SidbarContext } from "../context/SidbarContext";

const PostCards = ({ imgUrl, metaDesc, title, postId }) => {
  return (
    <Link className="flex flex-col justify-center bg-gray-900 border-gray-200 border-b-2  shadow md:flex-row lg:p-10 space-y-5 lg:space-y-0">
      <img
        className="object-cover w-full rounded-t-lg md:w-96 md:rounded-none md:rounded-l-lg"
        src={imgUrl}
        alt=""
      />
      <div className="flex flex-col justify-between lg:p-4 leading-normal">
        <h5 className="text-2xl font-bold tracking-tight  dark:text-white">
          {title}
        </h5>
        <p className=" font-normal dark:text-gray-400 line_clamp_6">
          {metaDesc}
        </p>
        <Link
          to={`../post/${postId}`}
          className="bg-[#ffd700] my-5 lg:my-0 w-32 px-5 py-1  rounded-sm shadow-lg text-[#7d0000] hover:animate-bounce "
        >
          Read More
        </Link>
      </div>
    </Link>
  );
};

const Blogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const sideBar = useContext(SidbarContext);

  let __URL__ ;
  if ( document.domain === "localhost" ) {
    __URL__ = "http://localhost:1337";
  } else {
    __URL__ = "";
  }

  const getPosts = async () => {
    setLoading(true);
    const res = await fetch(
      `${__URL__}/api/v1/posts?limit=8&sort=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (sideBar.showMenu) sideBar.setShowMenu(false);
    getPosts();
  }, []);

  return loading || posts.length == 0 ? (
    <div className="bg-white text-white">loading</div>
  ) : (
    <div className="text-white bg-gray-900 w-[95vw] space-y-10 lg:space-y-0 lg:w-[70vw] mx-auto my-10  py-5">
      <h2 className="w-full text-center text-3xl underline font-bold font-space">
        Catch our latest blogs
      </h2>
      <div className="lg:w-[60vw] space-y-10 mx-auto">
        {posts.map((blog, index) => {
          return (
            <PostCards
              key={index}
              imgUrl={blog["image_url"]}
              metaDesc={blog["description"]}
              title={blog.title}
              postId={blog.post_id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
