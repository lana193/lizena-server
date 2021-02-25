import { getObjectService, getAllObjectsService, createObjectService, updateObjectService, deleteObjectService, updateObjectPhotosService } from '../services/ObjectsService';

export const getObjectController = async (req, res) => {
    try {
        res.json(await getObjectService(req.params.id));
    } catch(e) {
        res.status(400).send('ID is not valid');
    }
};

export const getAllObjectsController = async (req, res) => {
   try { 
      res.json(await getAllObjectsService(req.query)); 
   }
   catch(e) {
      res.status(400).send('Bad request', e);
   }
};

export const createObjectController = async (req, res) => {
   if(req.user.role === 'Admin') {
      try {
         const response = await createObjectService(req.body, req.files)
         res.json(response);
      } catch(e) {
         const status = e || 500; res.status(status);
      }
   }
   else {
      res.status(400).send('You have not access for this action');
   }
    
 };

export const updateObjectController = async (req, res) => {
    console.log(req.files);
    try { res.json(await updateObjectService(req.params.id, req.body, req.files));
    } catch(e) {
        res.status(400).send('Bad request');
    }
 };

export const deleteObjectController = async (req, res) => {
   try { res.json(await deleteObjectService(req.params.id));
   } catch(e) {
        res.status(400).send('Bad request');
   }
};

export const updateObjectPhotosController = async (req, res) => {
   console.log('PARAMS', req.params.img);
   console.log('FILES', req.files);
   try { res.json(await updateObjectPhotosService(req.params.id, req.params.img, req.files));
   } catch(e) {
      console.log('ERROR', e);
      res.status(400).send('Bad request');
   }
};
