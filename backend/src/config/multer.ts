import multer from "multer";
import path from "path";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadFolder);
        },

        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}-${Math.round(Math.random() * 9999)}${ext}`;
            cb(null, fileName);
        }
    })
};

export const uploadFolderPath = uploadFolder;
