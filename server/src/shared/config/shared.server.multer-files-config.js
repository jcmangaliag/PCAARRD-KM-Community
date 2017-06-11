import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {	// add -(timestamp).(file extension) to filename
        cb(null, file.originalname.replace(/\.[^/.]+$/, "") + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

const fileUpload = multer({
    	storage,
    	limits: { fileSize: 20000000 } /* max 20mb per file */
	}).single('sharedUploadFiles');


export default fileUpload;