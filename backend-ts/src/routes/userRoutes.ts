import { Router } from 'express';
import { createUser, getUser, loginUser, isLoggedIn, editUser } from '../controllers/userController';

const router = Router();

router.put("/:id", editUser)
router.post('/', createUser);
router.post('/login', loginUser);
router.get("/isloggedin", isLoggedIn);
router.get('/:id', getUser);

export default router;