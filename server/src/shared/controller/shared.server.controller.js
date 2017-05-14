import multerFileUpload from '../config/shared.server.multer-files-config.js';
import multerImageUpload from '../config/shared.server.multer-image-config.js';
import cloudinaryConfig from '../config/shared.server.cloudinary-config.js';

const sharedControls = { 
	uploadFile: (req, res) => {
	   multerFileUpload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'File size is too large. Max limit is 20MB.' });
            } else {
                res.json({ success: false, message: 'Unable to upload file.' });
            }
        } else {
            if (!req.file) {
                res.json({ success: false, message: 'No file was selected.' });
            } else {
                cloudinaryConfig.uploader.upload(req.file.path, (result) => {
                    if (result.error){
                         res.json({ success: false, message: result.error.message});
                    } else {
                       res.json({ success: true, message: 'File uploaded!', file: result}); 
                    }
               });
            }
        }
    });
  },
  uploadImage: (req, res) => {
    multerImageUpload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'File size is too large. Max limit is 10MB.' });
            } else {
                res.json({ success: false, message: 'Unable to upload photo.' });
            }
        } else {
            if (!req.file) {
                res.json({ success: false, message: 'No photo was selected.' });
            } else {
                cloudinaryConfig.uploader.upload(req.file.path, (result) => {   // only accepts image
                    if (result.error){
                         res.json({ success: false, message: result.error.message});
                    } else {
                       res.json({ success: true, message: 'File uploaded!', image: result}); 
                    }
               });
            }
        }
    });
  }
}


export default sharedControls;