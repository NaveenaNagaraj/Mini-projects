import React from "react";

import { Link } from "react-router-dom";
const PostCard = ({imgUrl,desc,post_id,title}) => {
  return (
    <Link to={`post/${post_id}`} className="lg:max-w-[325px]  bg-gray-900 rounded overflow-hidden shadow-xl">
      <img
        className="w-full"
        src={imgUrl}
        alt="Sunset in the mountains"
      />
      <div className="px-2 lg:px-6 py-4">
        <div className="font-bold text-xl mb-2 line_clamp_4">{title}</div>
        <p className="text-base line_clamp_8">
         {desc}
        </p>
      </div>


      {/* ------------TAGS--------------- */}
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
    </Link>
  );
};

export default PostCard;
