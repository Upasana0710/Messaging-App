import express from 'express';
import { createMessage, getMessages, deleteMessages } from '../controllers/messageControllers.js';

const router = express.Router();

router.post('/',createMessage);
router.get('/:id',getMessages);
router.delete('/:id',deleteMessages);

export default router;