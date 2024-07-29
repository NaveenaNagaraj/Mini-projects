import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const Article = ({ title, metaDesc, imgUrl, content, postId }) => {
  return (
    <article className="lg:flex-[0.75] flex flex-col lg:flex-row bg-black">
      <div className="p-5 text-left lg:flex-[0.5] space-y-5">
        <h2 className="text-2xl">{title}</h2>
        <p class="mb-3 font-light  first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left ">
          {metaDesc}
        </p>
        <img
          src={imgUrl}
          alt="matrix image"
          className="shadow-md rounded-md w-full  object-cover"
        />
      </div>
      <div className="p-5 lg:flex-[0.5] space-y-3 text-left">
        <div
          class="font-light line_clamp_25"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        ></div>

        <div>
          <Link to={`post/${postId}`} className="bg-[#ffd700] px-5 py-1  rounded-sm shadow-lg text-[#7d0000] hover:px-10 ">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Article;
