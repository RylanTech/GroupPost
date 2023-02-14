import { Router } from 'express';
import { getPost, getUserPosts, getAllPosts, createPost, updatePost, deletePost } from '../controllers/postController';

const router = Router();

router.get('/user/:id', getUserPosts);

router.get('/:id', getPost);

router.get('/', getAllPosts);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;