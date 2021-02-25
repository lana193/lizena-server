import fs from 'fs';
import { directory } from '../../app';
import { ForSale } from '../models/ForSale';
import { getRandomImg } from '../utils/get_images';
import { filterObjArrMap } from '../utils/work_with_arrays';
import { resizeImages } from '../utils/upload';
import { baseUrl } from '../../config/base';

const folder = 'objects';
const mainImgType = 'main_image';
const photosType = 'photos';

export const getObjectService = (id) => {
    try {
        return ForSale.findById(id);
    } catch (e) {
        throw new Error();
    }
};

export const getAllObjectsService = (query) => {
    let filter = {};
    if (query.object_name) {
        filter.object_name = { $regex: `${query.object_name || '.'}`, $options: 'is' };
    }
    return ForSale.find(filter);
};

export const createObjectService = async (object, files) => {
    const newObject = new ForSale(object);

    const compressedPhotos = await resizeImages(files.photos, photosType, folder)
    const photosPathsArray = filterObjArrMap(compressedPhotos, folder);
    newObject.photos = photosPathsArray;

    if (files.main_image) {
        const compressedMainImage = await resizeImages(files.main_image, mainImgType, folder);
        const mainImgPathsArray = filterObjArrMap(compressedMainImage, folder);
        newObject.main_image = mainImgPathsArray;
    }
    else {
        newObject.main_image = getRandomImg(photosPathsArray);
    }
    return newObject.save();
};

export const updateObjectService = async (id, updatedObject, files) => {
    let filter = {};
    if (files) {
        if (files.main_image && files.photos) {

            const compressedMainImage = await resizeImages(files.main_image, mainImgType, folder)
            const mainImgPathsArray = filterObjArrMap(compressedMainImage, folder);

            const compressedPhotos = await resizeImages(files.photos, photosType, folder)
            const photosPathsArray = filterObjArrMap(compressedPhotos, folder);

            filter = {
                $set: updatedObject, main_image: mainImgPathsArray,
                $push: { photos: photosPathsArray }
            };
        }
        else if (files.main_image) {
            const compressedMainImage = await resizeImages(files.main_image, mainImgType, folder)
            const mainImgPathsArray = filterObjArrMap(compressedMainImage, folder);
            filter = {
                $set: updatedObject, main_image: mainImgPathsArray
            };
        }
        else {
            const compressedPhotos = await resizeImages(files.photos, photosType, folder)
            const photosPathsArray = filterObjArrMap(compressedPhotos, folder);
            filter = {
                $set: updatedObject,
                $push: { photos: photosPathsArray }
            };
        }
    }
    else {
        filter = { $set: updatedObject };
    }
    return ForSale.findByIdAndUpdate(id, filter, { new: true });
};

export const deleteObjectService = (id) => {
    return ForSale.findById(id).remove();
};

export const updateObjectPhotosService = async (id, img, files) => {
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

    return ForSale.findOneAndUpdate(search, filter, { returnNewDocument: true });
};
