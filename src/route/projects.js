import express from 'express';
import passport from 'passport';

import { getProjectController, getAllProjectsController, createProjectController, updateProjectController, deleteProjectController } from '../controllers/projectsController';
import { projectsUpload } from './../utils/upload';

const router = express.Router();
// @route   GET route/cats/id
// @desc    Get cat by id
// @access  Public
router.get('/project/:id', getProjectController);

// @route   GET route/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', getAllProjectsController);

// @route   POST route/projects
// @desc    Create a new Project
// @access  Private only admin
router.post('/project', passport.authenticate('jwt', { session: false }), 
 projectsUpload.fields([{ name: 'photos', maxCount: 20 }, { name: 'main_image', maxCount: 1 }]), createProjectController);

// @route   UPDATE route/project/id
// @desc    Edit project by id
// @access  Public
router.put('/project/:id', passport.authenticate('jwt', { session: false }), 
 projectsUpload.fields([{ name: 'photos', maxCount: 20 }, { name: 'main_image', maxCount: 1 }]), updateProjectController);

// @route   DELETE route/project/id
// @desc    Delete project by id
// @access  Public
router.delete('/project/:id', passport.authenticate('jwt', { session: false }), deleteProjectController);
  
export const projectsRouter = router;
