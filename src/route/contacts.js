import express from 'express';

import { sendMessageController } from '../controllers/contactsController';

const router = express.Router();

// @route   UPDATE route/project/id
// @desc    POST message from client
// @access  Public
router.post('/contacts/send', sendMessageController);

export const contactsRouter = router;