import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryRes, IFile } from "../interface/file";


cloudinary.config({
    cloud_name: "dgak3ha1i",
    api_key: "172911419654983",
    api_secret: "8KCIwv6b63vh--oIHRbMjjfuejY",
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const uploadToCloudinary = (file: IFile): Promise<ICloudinaryRes> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream((error, result) => {
                if (error) {
                    return reject(error);
                }
                if (result) {
                    resolve(result as unknown as ICloudinaryRes);
                } else {
                    reject(new Error("Cloudinary upload failed."));
                }
            })
            .end(file.buffer); 
    });
};

export const fileUploader = {
    upload,
    uploadToCloudinary,
};
