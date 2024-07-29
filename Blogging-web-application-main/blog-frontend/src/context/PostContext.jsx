import { createContext } from "react";

export const PostContext = createContext();

export const PostContextState = ({ children }) => {
  const post = {
    title: "",
    content: "",
    image_url: "",
    post_date: "",
    description: "",
    post_id: "",
    setPostID: (id) => {
        post.post_id = id;
    },
    setTitle: (title) => {
      post.title = title;
    },
    setContent: (content) => {
      post.content = content;
    },
    setPostDate: (date) => {
      post.post_date = date;
    },
    setImageURL: (imageURL) => {
      post.image_url = imageURL;
    },
    setDescription: (desc) => {
      post.description = desc;
    },
  };

  return (
    <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
  );
};
