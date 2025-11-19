import multer from "multer";
import path from "path";
import crypto from "crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default multer({
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(10).toString("hex");
            const ext = path.extname(file.originalname);
            const filename = `${hash}-${Date.now()}${ext}`;
            cb(null, filename);
        }
    })
});
