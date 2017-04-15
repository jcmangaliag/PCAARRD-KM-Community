import multerUpload from '../config/shared.server.multer-config.js';

const sharedControls = { 
	uploadFile: (req, res) => {
	   multerUpload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
            } else {
                res.json({ success: false, message: 'Unable to upload file' });
            }
        } else {
            if (!req.file) {
                res.json({ success: false, message: 'No file was selected' });
            } else {
                res.json({ success: true, message: 'File uploaded!', file: req.file });
            }
        }
    });
  }
}


export default sharedControls;