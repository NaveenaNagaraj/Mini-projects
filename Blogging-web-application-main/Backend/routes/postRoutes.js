import express from "express";
import { getPost,getAllPosts,writePost,editPost,deletePost} from "../controllers/postController.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post('/write',writePost)
router.put('/edit',editPost)
router.delete('/delete/:id',deletePost)

export default router;
