import fs from 'fs';

import { Project } from '../models/Project';
import { getRandomImg } from './../utils/get_images';
import { filterObjArrMap } from './../utils/work_with_arrays';
import { resizeImages } from '../utils/upload';
import { directory } from '../../app';
import { baseUrl } from '../../config/base';

const folder = 'projects';
const mainImgType = 'main_image';
const photosType = 'photos';

export const getProjectService = (id) => {
    try {
        return Project.findById(id);
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

export const createProjectService = async (project, files) => {
    const newProject = new Project(project);
    const compressedPhotos = await resizeImages(files.photos, photosType, folder)
    const photosPathsArray = filterObjArrMap(compressedPhotos, folder);
    newProject.photos = photosPathsArray;
    if (files.main_image) {
        const compressedMainImage = await resizeImages(files.main_image, mainImgType, folder)
        const mainImgPathsArray = filterObjArrMap(compressedMainImage, folder);
        newProject.main_image = mainImgPathsArray;
    }
    else {
        newProject.main_image = getRandomImg(photosPathsArray);
    }
    return newProject.save();
};

export const updateProjectService = async (id, updatedProject, files) => {
    let filter = {};
    if(files) {
        if(files.main_image && files.photos) {
            const compressedMainImage = await resizeImages(files.main_image, mainImgType, folder)
            const mainImgPathsArray = filterObjArrMap(compressedMainImage, folder);
            
            const compressedPhotos = await resizeImages(files.photos, photosType, folder)
            const photosPathsArray = filterObjArrMap(compressedPhotos, folder);
            filter = {
                $set: updatedProject, main_image: mainImgPathsArray,
                $push: { photos: photosPathsArray}
            };
        }
        else if (files.main_image) {
            const compressedMainImage = await resizeImages(files.main_image, mainImgType, folder)
            const mainImgPathsArray = filterObjArrMap(compressedMainImage, folder);
            filter = {
                $set: updatedProject, main_image: mainImgPathsArray 
            };
        }
        else {
            const compressedPhotos = await resizeImages(files.photos, photosType, folder)
            const photosPathsArray = filterObjArrMap(compressedPhotos, folder);
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

export const updateProjectPhotosService = async (id, img, files) => {
    const imgUrl = `${baseUrl}/uploads/${folder}/${img}`;
    console.log('URL', imgUrl);
    const imgPath = `${directory}/uploads/${folder}/${img}`;
    console.log('imgPath', imgPath);

    try {
        fs.unlinkSync(imgPath);
    } catch (e) {
        console.error(e);
    }

    let filter = {};
    let search = {};
    if (files.photos) {
        const compressedPhotos = await resizeImages(files.photos, photosType, folder)
        const photosPathsArray = filterObjArrMap(compressedPhotos, folder);

        search = { _id: id, photos: imgUrl };

        filter = {
            $set: {
                "photos.$": photosPathsArray[0]
            }
        };
    }
    else {
        console.log('In delete');
        search = { _id: id };

        filter = { 
            $pull: {
                photos: { $in: imgUrl }
            }
        };
    }

    return Project.findOneAndUpdate(search, filter, { returnNewDocument: true });
};
