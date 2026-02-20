import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', "image/gif", "image/webp"];

    if(!allowedTypes.includes(file.mimetype)) {
        return callback(new Error("File type is not allowed!"), false);
    } else
    return callback(null, true);
}

const limits = {
    fileSize: 5 * 1024 * 1024,
}

const upload = multer({ storage, limits, fileFilter });

export default upload;