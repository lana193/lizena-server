import { Project } from '../models/Project';
import { getRandomImg } from './../utils/get_images';
import { filterObjArrMap } from './../utils/work_with_arrays';

export const getProjectService = (id) => {
    try {
        return Project.findById(id).populate('owner', '-password');
    } catch(e) {
        throw new Error();
    }
};

export const getAllProjectsService = (query) => {
    // .updateMany({}, { $set: { photos: []}}).then(console.log);
    let filter = {};
    if(query.project_name)
    {
       filter.project_name = { $regex: `${query.project_name || '.'}`, $options: 'is' };
    }
    if(query.for_sale)
    {
        const forSaleValue = query.for_sale;
        filter.for_sale = { $eq: forSaleValue };
    }
    return Project.find(filter);
};

export const createProjectService = (project, files) => {
    const newProject = new Project(project);
    const photosPathsArray = filterObjArrMap(files.photos, 'linkUrl');
    newProject.photos = photosPathsArray;
    if (files.main_image) {
        const mainImgPathsArray = filterObjArrMap(files.main_image, 'linkUrl');
        newProject.main_image = mainImgPathsArray;
    }
    else {
        newProject.main_image = getRandomImg(photosPathsArray);
    }
    return newProject.save();
};

export const updateProjectService = (id, updatedProject, files) => {
    let filter = {};
    if(files) {
        if(files.main_image && files.photos) {
            const mainImgPathsArray = filterObjArrMap(files.main_image, 'linkUrl');
            const photosPathsArray = filterObjArrMap(files.photos, 'linkUrl');
            filter = {
                $set: updatedProject, main_image: mainImgPathsArray ,
                $push: { photos: photosPathsArray}
            };
        }
        else if (files.main_image) {
            const mainImgPathsArray = filterObjArrMap(files.main_image, 'linkUrl');
            filter = {
                $set: updatedProject, main_image: mainImgPathsArray 
            };
        }
        else {
            const photosPathsArray = filterObjArrMap(files.photos, 'linkUrl');
            filter = {
                $set: updatedProject,
                $push: { photos: photosPathsArray } 
            };
        }
    }
    else {
        filter = { $set: updatedProject };
    }
    return Project.findByIdAndUpdate(id, filter, { new: true });
};

export const deleteProjectService = (id) => {
    return Project.findById(id).remove();
};
