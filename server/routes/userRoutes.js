import express from 'express';
import {googleAuth, getUser, searchUser} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/googleLogin',googleAuth);
router.get('/search',searchUser);
router.get('/:id',getUser);

export default router;