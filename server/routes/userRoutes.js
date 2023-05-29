import express from 'express';
import {signup, signin, getUser} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/:id',getUser);

export default router;