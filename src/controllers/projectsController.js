import { getProjectService, getAllProjectsService, createProjectService, updateProjectService, deleteProjectService } from '../services/ProjectsService';

export const getProjectController = async (req, res) => {
    try {
        res.json(await getProjectService(req.params.id));
    } catch(e) {
        res.status(400).send('ID is not valid');
    }
};

export const getAllProjectsController = async (req, res) => {
   try { 
      res.json(await getAllProjectsService(req.query)); 
   }
   catch(e) {
      res.status(400).send('Bad request', e);
   }
};

export const createProjectController = async (req, res) => {
   if(req.user.role === 'Admin') {
      console.log(777, req.user)
      console.log(444, req.body)
      try {
         const response = await createProjectService(req.body, req.files)
         res.json(response);
      } catch(e) {
         const status = e || 500; res.status(status);
         //  res.status(400).send('Bad request', e);
      }
   }
   else {
      res.status(400).send('You have not access for this action');
   }
    
 };

 export const updateProjectController = async (req, res) => {
    try { res.json(await updateProjectService(req.params.id, req.body, req.files));
    } catch(e) {
        res.status(400).send('Bad request');
    }
 };

 export const deleteProjectController = async (req, res) => {
    try { res.json(await deleteProjectService(req.params.id));
    } catch(e) {
        res.status(400).send('Bad request');
    }
 };
