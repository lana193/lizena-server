import { getUserService, getAllUsersService, createUserService, updateUserService, deleteUserService } from './../services/userService';
export const getUserController = async (req, res) => {
    try {
        res.json(await getUserService({ _id: req.params.id}));
    } catch(e) {
        res.status(400).send('ID is not valid');
    }
};

export const getAllUsersController = async (req, res) => {
    res.json(await getAllUsersService());
};

export const createUserController = async (req, res) => {
    try {
        res.json(await createUserService(req.body));
    }
    catch(e) {
        res.status(400).send('Bad request');
    }
};

export const updateUserController = async (req, res) => {
    try {
        console.log(req.file);
        res.json(await updateUserService(req.params.id, req.body, req.file));
    }
    catch(e) {
        res.status(400).send('Bad request');
    }
};

export const deleteUserController = async (req, res) => {
    try {
        res.json(await deleteUserService(req.params.id));
    }
    catch(e) {
        res.status(400).send('Bad request');
    }
};

