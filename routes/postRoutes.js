import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUserId   // <-- import the new function here
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/user/:userId', getPostsByUserId);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
