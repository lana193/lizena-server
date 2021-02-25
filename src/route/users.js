import express from 'express';
import passport from 'passport';

import { usersUpload } from './../utils/upload';
import { getUserController, getAllUsersController, createUserController, updateUserController, deleteUserController } from './../controllers/usersController';

const router = express.Router();

// @route GET route/users/id
// @desc get user by id/email
// @access Public
router.get('/users/:id', getUserController);



// @route GET route/users
// @desc get All users
// @access Public
router.get('/users', getAllUsersController);

// @route POST route/users
// @desc Create a new user
// @access Public
router.post('/users', passport.authenticate('jwt', { session: false }), createUserController);

// @route PUT route/users
// @desc update user by id
// @access Public
router.put('/users/:id', passport.authenticate('jwt', { session: false }), usersUpload.single('profile_image'), updateUserController);

// @route DELETE route/users/id
// @desc Delete User by id
// @access Public
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), deleteUserController);

export const usersRouter = router;