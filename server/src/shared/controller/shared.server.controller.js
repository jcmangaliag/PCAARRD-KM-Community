import multerFileUpload from '../config/shared.server.multer-files-config.js';
import multerImageUpload from '../config/shared.server.multer-image-config.js';

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
                res.json({ success: true, message: 'File uploaded!', file: req.file });
            }
        }
    });
  },
  uploadImage: (req, res) => {
    multerImageUpload(req, res, (err) => {
        console.log("ang err ay");
        console.log(err);
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
                res.json({ success: true, message: 'File uploaded!', image: req.file });
            }
        }
    });
  }
}


export default sharedControls;