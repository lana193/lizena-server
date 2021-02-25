import express from 'express';
import passport from 'passport';

import { getObjectController, 
        getAllObjectsController, 
        createObjectController, 
        updateObjectController, 
        deleteObjectController,
        updateObjectPhotosController
    } from '../controllers/objectsController';
import { objectsUpload } from '../utils/upload';

const router = express.Router();

// @route   GET route/objects/id
// @desc    Get object by id
// @access  Public
router.get('/object/:id', getObjectController);

// @route   GET route/objects
// @desc    Get all objects
// @access  Public
router.get('/objects', getAllObjectsController);

// @route   POST route/objects
// @desc    Create a new Object
// @access  Private only admin
router.post('/object', passport.authenticate('jwt', { session: false }), 
    objectsUpload.fields([{ name: 'photos', maxCount: 30 }, { name: 'main_image', maxCount: 1 }]), createObjectController);

// @route   UPDATE route/object/id
// @desc    Edit object by id
// @access  Public
router.put('/object/:id', passport.authenticate('jwt', { session: false }), 
    objectsUpload.fields([{ name: 'photos', maxCount: 30 }, { name: 'main_image', maxCount: 1 }]), updateObjectController);

// @route   DELETE route/object/id
// @desc    Delete object by id
// @access  Private only admin
router.delete('/object/:id', passport.authenticate('jwt', { session: false }), deleteObjectController);

// @route   PUT route/object/image
// @desc    Add new image to the object
// @access  Private only admin
router.put('/object/:id/image/:img', passport.authenticate('jwt', { session: false }), 
    objectsUpload.fields([{ name: 'photos', maxCount: 1 }]), updateObjectPhotosController);

// @route   PUT route/object/image
// @desc    Add new image to the object
// @access  Private only admin
// router.put('/object/:id/image/:img', passport.authenticate('jwt', { session: false }), deleteObjectImageController);
  
export const forSaleRouter = router;
