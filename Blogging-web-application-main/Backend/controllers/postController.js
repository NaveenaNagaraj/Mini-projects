import db from "../config/db.js";

export const getAllPosts = (req, res) => {
  
  const q = req.query.limit?"SELECT title,content,description,image_url,post_id FROM posts LIMIT ?":"SELECT title,description,image_url,post_id FROM posts";
  db.query(q,[parseInt(req.query.limit)], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal server error", status: "error" });
    }

    const posts = results;
    res.json(posts);
  });
};

export const getPost = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT title,content,post_id,image_url,user_id,post_date,description,user_name FROM posts p,user u WHERE p.post_id = ?";
  db.query(q, [id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Internal server error", status: "error" });
    const post = results[0];
    res.status(200).json(post);
  });
};

export const writePost = (req, res) => {
  const { title, content, post_date, image_url, user_id, description } =
    req.body;
  const q =
    "INSERT INTO posts (title,content,post_date,image_url,user_id,description) VALUES (?,?,?,?,?,?)";
  db.query(
    q,
    [title, content, post_date, image_url, user_id, description],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal server error", status: "error" });
      }
      if (results.affectedRows === 0)
        return res
          .status(500)
          .json({ message: "Internal server error", status: "error" });
      res.status(200).json({
        message: "Post created",
        status: "success",
        post_id: results.insertId,
      });
    }
  );
};

export const editPost = (req, res) => {
  const { title, content, post_date, image_url, description, post_id } =
    req.body;

  const q =
    "UPDATE posts SET title = ?, content = ?, post_date = ?, image_url = ?, description = ? WHERE post_id = ?";
  db.query(
    q,
    [title, content, post_date, image_url, description, post_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err, status: "error" });

      if (results.affectedRows === 0)
        return res
          .status(500)
          .json({ message: "No post exist", status: "error" });
      console.log(results.insertId);
      res.status(200).json({ message: "Post updated", status: "success" });
    }
  );
};

export const deletePost = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM posts WHERE post_id = ?";
  db.query(q, [id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Internal server error", status: "error" });

    if (results.affectedRows === 0)
      return res
        .status(500)
        .json({ message: "Internal server error", status: "error" });
    res.status(200).json({ message: "Post deleted", status: "success" });
  });
};
