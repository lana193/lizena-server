import multer from 'multer';

const projectsStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/projects');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
    path: (req, file, callback) => {
        callback(null, `./uploads/projects/${file.filename}`);
    },
});

const objectsStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/objects');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
    path: (req, file, callback) => {
        callback(null, `./uploads/objects/${file.filename}`);
    },
});

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
    limits: { fileSize: 1024 * 1024 * 3},
    fileFilter: fileFilter
});

export const objectsUpload = multer({ storage: objectsStorage, 
    limits: { fileSize: 1024 * 1024 * 3},
    fileFilter: fileFilter
});