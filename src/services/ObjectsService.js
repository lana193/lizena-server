import { ForSale } from '../models/ForSale';
import { getRandomImg } from '../utils/get_images';
import { filterObjArrMap } from '../utils/work_with_arrays';

export const getObjectService = (id) => {
    try {
        return ForSale.findById(id).populate('owner', '-password');
    } catch(e) {
        throw new Error();
    }
};

export const getAllObjectsService = (query) => {
    let filter = {};
    if(query.object_name)
    {
       filter.object_name = { $regex: `${query.object_name || '.'}`, $options: 'is' };
    }
    return ForSale.find(filter);
};

export const createObjectService = (object, files) => {
    const newObject = new ForSale(object);
    const photosPathsArray = filterObjArrMap(files.photos, 'path', 'objects');
    newObject.photos = photosPathsArray;
    if (files.main_image) {
        const mainImgPathsArray = filterObjArrMap(files.main_image, 'path', 'objects');
        newObject.main_image = mainImgPathsArray;
    }
    else {
        newObject.main_image = getRandomImg(photosPathsArray);
    }
    return newObject.save();
};

export const updateObjectService = (id, updatedObject, files) => {
    let filter = {};
    if(files) {
        if(files.main_image && files.photos) {
            // console.log(222, "Files")
            const mainImgPathsArray = filterObjArrMap(files.main_image, 'path', 'objects');
            const photosPathsArray = filterObjArrMap(files.photos, 'path', 'objects');
            filter = {
                $set: updatedObject, main_image: mainImgPathsArray,
                $push: { photos: photosPathsArray}
            };
        }
        else if (files.main_image) {
            const mainImgPathsArray = filterObjArrMap(files.main_image, 'path', 'objects');
            filter = {
                $set: updatedObject, main_image: mainImgPathsArray 
            };
        }
        else {
            const photosPathsArray = filterObjArrMap(files.photos, 'path', 'objects');
            filter = {
                $set: updatedObject,
                $push: { photos: photosPathsArray } 
            };
        }
    }
    else {
    console.log(222, 'No files')
        filter = { $set: updatedObject };
    }
    return ForSale.findByIdAndUpdate(id, filter, { new: true });
};

export const deleteObjectService = (id) => {
    return ForSale.findById(id).remove();
};
