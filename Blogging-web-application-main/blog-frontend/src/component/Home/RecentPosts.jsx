import React, { useState, useEffect } from "react";
import Article from "./Article";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import { BsSearch } from "react-icons/bs";
import PostCard from "./PostCard";

const AsideNav = ({ imgUrl, title , postId}) => {
  return (
    <Link to={`post/${postId}`} className="flex space-x-4 border-b-[1px] border-white pb-2">
      <img src={imgUrl} alt="" className="w-28" />
      <div>
        <h5 className="line_clamp_3">{title}</h5>
      </div>
    </Link>
  );
};

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  let __URL__ ;
  if ( document.domain === "localhost" ) {
    __URL__ = "http://localhost:1337";
  } else {
    __URL__ = "";
  }
  const getPosts = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return loading || posts.length == 0 ? (
    <div className="bg-white text-white">loading</div>
  ) : (
    <div className="w-full font-space2 bg-[#212121] flex flex-col justify-center items-center flex-wrap">
      <div className="flex flex-wrap lg:w-[85vw] p-5 lg:space-x-5">
        <Article
          title={posts[0]["title"]}
          metaDesc={posts[0]["description"]}
          imgUrl={posts[0]["image_url"]}
          content={posts[0]["content"]}
          postId={posts[0]["post_id"]}
        />
        {/* <Aside /> */}
        <div className="bg-gray-900 w-full lg:flex-[0.25] shadow-2xl p-5 space-y-5">
          <div className="flex w-ful space-x-5">
            <input
              type="text"
              className="bg-white w-full h-10 foucs rounded-md outline-transparent placeholder:pl-5"
              placeholder="Search by article or tags"
            />
            <button>
              <BsSearch />
            </button>
          </div>
          {posts.map((blog, index) => {
            return (
              <AsideNav title={blog["title"]} imgUrl={blog["image_url"]} postId={blog['post_id']} key={index}/>
            );
          })}
        </div>
      </div>
      <div className="flex w-[85vw] justify-between items-center flex-wrap lg:px-5 my-5 space-y-5  bg-black py-5 rounded-md">
        <h2 className="text-center text-2xl w-full ">
          Trendig Software Discussions
        </h2>
        {posts.map((blog, index) => {
          return (
            <PostCard
              key={index}
              title={blog["title"]}
              desc={blog["description"]}
              imgUrl={blog["image_url"]}
             post_id={blog['post_id']}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentPosts;
