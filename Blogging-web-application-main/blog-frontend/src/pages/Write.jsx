import React, { useState, useEffect, useRef, useContext } from "react";
import JoditEditor from "jodit-react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SidbarContext } from "../context/SidbarContext";
import { isExpired, decodeToken } from "react-jwt";

const Write = () => {
  const token = localStorage.getItem("access_token") || null;
  const decodedToken = decodeToken(token);
  const sideBar = useContext(SidbarContext);

  useEffect(() => {
    if (sideBar.showMenu) sideBar.setShowMenu(false);
  }, []);
  const navigate = useNavigate();
  const refrence = useRef(null);

  //inputs for the post
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");

  // Adding and removing tags
  const addTag = () => {
    if (document.getElementById("tags").value === "") return;
    const tag = document.getElementById("tags").value;
    setTags((prev) => [...prev, tag]);
    document.getElementById("tags").value = "";
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((ele, i) => i !== index));
  };

  //publishing the post with API call
  const publishPost = async () => {
    try {
      if (
        title === "" ||
        content === "" ||
        tags.length === 0 ||
        imageUrl === ""
      ) {
        alert("Please fill all the fields");
        return;
      }

      const res = await fetch("http://localhost:1337/api/v1/posts/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          post_date: new Date().toISOString().slice(0, 10),
          image_url: imageUrl,
          user_id: decodedToken.id,
          description: desc,
        }),
      });
      const data = await res.json();
      console.log(data)
      if (data.status === "success") {
        alert(data.message);
        navigate(`../post/${data.post_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-0 w-[80vw] mx-auto mt-10 space-y-5 text-white">
      <div className="w-full space-y-5">
        <label htmlFor="title" className="rounded-md text-2xl">
          Title
        </label>
        <input
          type="text"
          className="outline-none w-full h-10 text-gray-900 px-5 font-medium font-mono"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-5 text-gray-900 font-xl">
        <label htmlFor="image_url" className="rounded-md text-2xl text-white">
          Image
        </label>
        <input
          type="text"
          className="outline-none w-full h-10 text-gray-900 px-5 font-medium font-mono"
          id="image_url"
          placeholder="image url"
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <div className="space-y-5 text-gray-900 font-xl">
        <label htmlFor="description" className="rounded-md text-2xl text-white">
          Description
        </label>
        <textarea
          type="text"
          className="outline-none w-full text-gray-900 p-5 font-medium font-mono"
          id="description"
          placeholder="Meta description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>
      <div className="space-y-5 text-gray-900 font-xl">
        <label htmlFor="content" className="rounded-md text-2xl text-white">
          Content
        </label>
        <JoditEditor
          ref={refrence}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="file" className="rounded-md text-2xl text-white">
          Tags
        </label>
        <div className="flex justify-between space-x-5">
          <input
            type="inputs"
            id="tags"
            className="outline-none h-9 rounded-sm focus:shadow-lg text-gray-800 px-5 w-full"
          />
          <label htmlFor="tags">
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-500 px-5 py-2 rounded-md text-white font-medium"
            >
              Add
            </button>
          </label>
        </div>
      </div>
      <div className="flex flex-wrap">
        {tags.length > 0 &&
          tags.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center bg-white px-4 py-1 rounded-sm text-gray-800 space-x-2 mx-1 my-2"
              >
                <span>{ele}</span>
                <button
                  onClick={() => {
                    removeTag(index);
                  }}
                  className="flex justify-center items-center"
                >
                  <AiOutlineClose size={"10px"} />
                </button>
              </div>
            );
          })}
      </div>
      <div>
        <button
          onClick={publishPost}
          className="bg-blue-500 px-5 py-2 rounded-md text-white font-medium"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Write;
