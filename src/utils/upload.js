
import multer from 'multer';
import sharp from 'sharp'

const projectsStorage = multer.memoryStorage();
const objectsStorage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // Save in local storage
        callback(null, true);
    }
    else {
        // Not saving
        callback(null, false);
    }
};

export const projectsUpload = multer({ storage: projectsStorage, 
    fileFilter: fileFilter
});

export const objectsUpload = multer({ storage: objectsStorage, 
    fileFilter: fileFilter
});

export const resizeImages = async (files, type, folder) => {
    if (!files) return new Error('No files');
    const compressedImages = [];
    console.log(777, files)
    await Promise.all(
      files.map(async file => {
        const filename = file.originalname.replace(/\..+$/, "");
        const newFilename = `${type}-${filename}-${Date.now()}.jpeg`;
  
        await sharp(file.buffer)
          .rotate()
          .resize({ width: 900})
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/uploads/${folder}/${newFilename}`);
  
        compressedImages.push(newFilename);
        console.log('commpressedImages', compressedImages)
      })
    );
  
    return compressedImages;
};

